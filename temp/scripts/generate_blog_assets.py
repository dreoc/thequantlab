#!/usr/bin/env python3
"""Regenerate feed.xml from js/blog-posts-data.js so the site keeps one blog metadata source."""

from pathlib import Path
import json
import re
import email.utils
from datetime import datetime, timezone
from urllib.parse import urljoin
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "js" / "blog-posts-data.js"
FEED_FILE = ROOT / "feed.xml"

SITE_URL = "https://www.thequantlab.org"
BLOG_URL = f"{SITE_URL}/pages/blog.html"


def to_cdata(value) -> str:
    """Wrap text safely in CDATA."""
    text = "" if value is None else str(value)
    text = text.replace("]]>", "]]]]><![CDATA[>")
    return f"<![CDATA[{text}]]>"


def normalize_url(url: str | None) -> str | None:
    """Return an absolute URL or None."""
    if not url:
        return None
    return urljoin(SITE_URL, url)


def format_pubdate(value: str) -> str:
    """Parse ISO-like date strings and return RFC 2822 format for RSS."""
    raw = value.strip()

    if raw.endswith("Z"):
        raw = raw[:-1] + "+00:00"

    dt = datetime.fromisoformat(raw)

    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    else:
        dt = dt.astimezone(timezone.utc)

    return email.utils.format_datetime(dt)


text = DATA_FILE.read_text(encoding="utf-8")

match = re.search(
    r"window\.quantLabBlogPosts\s*=\s*(\[[\s\S]*?\])\s*;?",
    text,
)
if not match:
    raise SystemExit("Could not parse js/blog-posts-data.js")

try:
    posts = json.loads(match.group(1))
except json.JSONDecodeError as exc:
    raise SystemExit(f"Could not decode blog post JSON: {exc}") from exc

items = []

for post in sorted(posts, key=lambda p: p.get("order", 999)):
    item_url = normalize_url(post.get("canonicalUrl") or post.get("url"))
    if not item_url:
        print(f"Skipping post with missing URL: {post.get('title', '<untitled>')}")
        continue

    excerpt = post.get("excerpt", "") or ""
    source = post.get("source", "") or ""
    if source:
        description = f"{excerpt} Originally published at {source}."
    else:
        description = excerpt

    parts = [
        "  <item>",
        f"    <title>{to_cdata(post.get('title', ''))}</title>",
        f"    <link>{escape(item_url)}</link>",
        f'    <guid isPermaLink="true">{escape(item_url)}</guid>',
        f"    <description>{to_cdata(description)}</description>",
        f"    <category>{to_cdata(post.get('category', 'Blog'))}</category>",
        f"    <author>blog@thequantlab.org ({escape(post.get('author', 'The QuantLab'))})</author>",
    ]

    published = post.get("published")
    if published:
        try:
            parts.append(f"    <pubDate>{format_pubdate(published)}</pubDate>")
        except ValueError as exc:
            print(
                f"Skipping bad published date for {post.get('title', '<untitled>')}: {published} ({exc})"
            )

    parts.append("  </item>")
    items.append("\n".join(parts))

feed = "\n".join(
    [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0">',
        "<channel>",
        f"  <title>{to_cdata('The QuantLab Blog')}</title>",
        f"  <link>{escape(BLOG_URL)}</link>",
        f"  <description>{to_cdata('Selected public writing and short-form essays connected to QuantLab research.')}</description>",
        "  <language>en-us</language>",
        f"  <lastBuildDate>{email.utils.format_datetime(datetime.now(timezone.utc))}</lastBuildDate>",
        *items,
        "</channel>",
        "</rss>",
        "",
    ]
)

FEED_FILE.write_text(feed, encoding="utf-8")
print(f"Updated {FEED_FILE}")