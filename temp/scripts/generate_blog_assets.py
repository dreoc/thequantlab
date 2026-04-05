#!/usr/bin/env python3
"""I regenerate feed.xml from js/blog-posts-data.js so the site keeps one blog metadata source."""
from pathlib import Path
import json, re, email.utils
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / 'js' / 'blog-posts-data.js'
FEED_FILE = ROOT / 'feed.xml'
BLOG_URL = 'https://www.thequantlab.org/pages/blog.html'

text = DATA_FILE.read_text(encoding='utf-8')
match = re.search(r'window\.quantLabBlogPosts\s*=\s*(\[.*\]);\s*$', text, re.S)
if not match:
    raise SystemExit('Could not parse js/blog-posts-data.js')
posts = json.loads(match.group(1))

items = []
for post in sorted(posts, key=lambda p: p.get('order', 999)):
    parts = [
    '  <item>',
    f"    <title><![CDATA[{post.get('title', '')}]]></title>",
    f"    <link>{post.get('canonicalUrl') or post.get('url')}</link>",
    f'    <guid isPermaLink="true">{post.get("canonicalUrl") or post.get("url")}</guid>',
    f"    <description><![CDATA[{post.get('excerpt', '')} Originally published at {post.get('source', '')}.]]></description>",
    f"    <category><![CDATA[{post.get('category', 'Blog')}]]></category>",
    f"    <author>blog@thequantlab.org ({post.get('author', 'The QuantLab')})</author>",
]
    if post.get('published'):
        dt = datetime.fromisoformat(post['published']).replace(tzinfo=timezone.utc)
        parts.append(f"    <pubDate>{email.utils.format_datetime(dt)}</pubDate>")
    parts.append('  </item>')
    items.append('\n'.join(parts))

feed = '\n'.join([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    '  <title><![CDATA[The QuantLab Blog]]></title>',
    f'  <link>{BLOG_URL}</link>',
    '  <description><![CDATA[Selected public writing and short-form essays connected to QuantLab research.]]></description>',
    '  <language>en-us</language>',
    '  <lastBuildDate>' + email.utils.format_datetime(datetime.now(timezone.utc)) + '</lastBuildDate>',
    *items,
    '</channel>',
    '</rss>',
    ''
])
FEED_FILE.write_text(feed, encoding='utf-8')
print(f'Updated {FEED_FILE}')
