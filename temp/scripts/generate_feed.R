#!/usr/bin/env Rscript

# Regenerate feed.xml from js/blog-posts-data.js
# Keeps the site on one blog metadata source.

required_pkgs <- c("V8", "jsonlite")

missing_pkgs <- required_pkgs[
  !vapply(required_pkgs, requireNamespace, logical(1), quietly = TRUE)
]

if (length(missing_pkgs) > 0) {
  suppressMessages(
    suppressWarnings(
      install.packages(
        missing_pkgs,
        repos = "https://cloud.r-project.org",
        quiet = TRUE
      )
    )
  )
}

suppressPackageStartupMessages({
  library(V8)
  library(jsonlite)
})

# ------------------------------------------------------------
# Helpers
# ------------------------------------------------------------

get_script_path <- function() {
  cmd_args <- commandArgs(trailingOnly = FALSE)
  file_arg <- "--file="
  hit <- grep(file_arg, cmd_args)
  
  if (length(hit) > 0) {
    return(normalizePath(
      sub(file_arg, "", cmd_args[hit[1]]),
      winslash = "/",
      mustWork = TRUE
    ))
  }
  
  if (!is.null(sys.frames()[[1]]$ofile)) {
    return(normalizePath(
      sys.frames()[[1]]$ofile,
      winslash = "/",
      mustWork = TRUE
    ))
  }
  
  stop("Could not determine script path. Run with Rscript or set ROOT manually.")
}

xml_escape <- function(x) {
  x <- ifelse(is.na(x), "", as.character(x))
  x <- gsub("&", "&amp;", x, fixed = TRUE)
  x <- gsub("<", "&lt;", x, fixed = TRUE)
  x <- gsub(">", "&gt;", x, fixed = TRUE)
  x <- gsub('"', "&quot;", x, fixed = TRUE)
  x <- gsub("'", "&apos;", x, fixed = TRUE)
  x
}

to_cdata <- function(x) {
  x <- ifelse(is.na(x), "", as.character(x))
  x <- gsub("]]>", "]]]]><![CDATA[>", x, fixed = TRUE)
  paste0("<![CDATA[", x, "]]>")
}

normalize_url <- function(url, site_url) {
  if (is.null(url) || length(url) == 0 || is.na(url) || trimws(url) == "") {
    return(NA_character_)
  }
  
  url <- trimws(as.character(url))
  
  if (grepl("^https?://", url, ignore.case = TRUE)) {
    return(url)
  }
  
  if (startsWith(url, "/")) {
    return(paste0(site_url, url))
  }
  
  paste0(site_url, "/", url)
}

format_pubdate <- function(value) {
  raw <- trimws(as.character(value))
  
  if (raw == "" || is.na(raw)) {
    stop("Empty date.")
  }
  
  if (grepl("^\\d{4}-\\d{2}-\\d{2}$", raw)) {
    dt <- as.POSIXct(paste0(raw, " 00:00:00"), tz = "UTC")
    return(format(dt, "%a, %d %b %Y %H:%M:%S GMT", tz = "GMT"))
  }
  
  raw2 <- sub("Z$", "+00:00", raw)
  
  dt <- as.POSIXct(raw2, format = "%Y-%m-%dT%H:%M:%OS%z", tz = "UTC")
  if (is.na(dt)) dt <- as.POSIXct(raw2, format = "%Y-%m-%d %H:%M:%OS%z", tz = "UTC")
  if (is.na(dt)) dt <- as.POSIXct(raw2, format = "%Y-%m-%dT%H:%M:%OS", tz = "UTC")
  if (is.na(dt)) dt <- as.POSIXct(raw2, format = "%Y-%m-%d %H:%M:%OS", tz = "UTC")
  
  if (is.na(dt)) {
    stop(sprintf("Could not parse date: %s", raw))
  }
  
  format(dt, "%a, %d %b %Y %H:%M:%S GMT", tz = "GMT")
}

get_col <- function(df, name, default = "") {
  if (name %in% names(df)) {
    return(df[[name]])
  }
  rep(default, nrow(df))
}

find_assignment_start <- function(js_text) {
  patterns <- c(
    "window\\s*\\.\\s*quantLabBlogPosts\\s*=",
    "window\\s*\\[\\s*['\"]quantLabBlogPosts['\"]\\s*\\]\\s*=",
    "globalThis\\s*\\.\\s*quantLabBlogPosts\\s*=",
    "self\\s*\\.\\s*quantLabBlogPosts\\s*=",
    "\\bquantLabBlogPosts\\b\\s*="
  )
  
  starts <- c()
  
  for (pat in patterns) {
    loc <- regexpr(pat, js_text, perl = TRUE)[1]
    if (loc > 0) {
      starts <- c(starts, loc + attr(regexpr(pat, js_text, perl = TRUE), "match.length"))
    }
  }
  
  if (length(starts) == 0) {
    return(NA_integer_)
  }
  
  min(starts)
}

extract_assigned_array <- function(js_text) {
  assign_end <- find_assignment_start(js_text)
  
  if (is.na(assign_end)) {
    return(NULL)
  }
  
  n <- nchar(js_text, type = "chars")
  chars <- strsplit(js_text, "", fixed = TRUE)[[1]]
  
  i <- assign_end + 1L
  while (i <= n && grepl("\\s", chars[i], perl = TRUE)) {
    i <- i + 1L
  }
  
  while (i <= n && chars[i] != "[") {
    if (!grepl("\\s", chars[i], perl = TRUE)) {
      return(NULL)
    }
    i <- i + 1L
  }
  
  if (i > n || chars[i] != "[") {
    return(NULL)
  }
  
  start_idx <- i
  depth <- 0L
  in_single <- FALSE
  in_double <- FALSE
  in_backtick <- FALSE
  in_line_comment <- FALSE
  in_block_comment <- FALSE
  escape_next <- FALSE
  
  while (i <= n) {
    ch <- chars[i]
    nxt <- if (i < n) chars[i + 1L] else ""
    
    if (in_line_comment) {
      if (ch == "\n") {
        in_line_comment <- FALSE
      }
      i <- i + 1L
      next
    }
    
    if (in_block_comment) {
      if (ch == "*" && nxt == "/") {
        in_block_comment <- FALSE
        i <- i + 2L
      } else {
        i <- i + 1L
      }
      next
    }
    
    if (in_single) {
      if (escape_next) {
        escape_next <- FALSE
      } else if (ch == "\\") {
        escape_next <- TRUE
      } else if (ch == "'") {
        in_single <- FALSE
      }
      i <- i + 1L
      next
    }
    
    if (in_double) {
      if (escape_next) {
        escape_next <- FALSE
      } else if (ch == "\\") {
        escape_next <- TRUE
      } else if (ch == "\"") {
        in_double <- FALSE
      }
      i <- i + 1L
      next
    }
    
    if (in_backtick) {
      if (escape_next) {
        escape_next <- FALSE
      } else if (ch == "\\") {
        escape_next <- TRUE
      } else if (ch == "`") {
        in_backtick <- FALSE
      }
      i <- i + 1L
      next
    }
    
    if (ch == "/" && nxt == "/") {
      in_line_comment <- TRUE
      i <- i + 2L
      next
    }
    
    if (ch == "/" && nxt == "*") {
      in_block_comment <- TRUE
      i <- i + 2L
      next
    }
    
    if (ch == "'") {
      in_single <- TRUE
      i <- i + 1L
      next
    }
    
    if (ch == "\"") {
      in_double <- TRUE
      i <- i + 1L
      next
    }
    
    if (ch == "`") {
      in_backtick <- TRUE
      i <- i + 1L
      next
    }
    
    if (ch == "[") {
      depth <- depth + 1L
    } else if (ch == "]") {
      depth <- depth - 1L
      if (depth == 0L) {
        return(substr(js_text, start_idx, i))
      }
    }
    
    i <- i + 1L
  }
  
  NULL
}

# ------------------------------------------------------------
# Paths
# ------------------------------------------------------------

SCRIPT_PATH <- get_script_path()
ROOT <- dirname(dirname(SCRIPT_PATH))

DATA_FILE <- file.path(ROOT, "js", "blog-posts-data.js")
FEED_FILE <- file.path(ROOT, "feed.xml")

SITE_URL <- "https://www.thequantlab.org"
BLOG_URL <- paste0(SITE_URL, "/pages/blog.html")

if (!file.exists(DATA_FILE)) {
  stop(sprintf("Could not find data file: %s", DATA_FILE))
}

# ------------------------------------------------------------
# Read JS data
# ------------------------------------------------------------

js_text <- paste(
  readLines(DATA_FILE, warn = FALSE, encoding = "UTF-8"),
  collapse = "\n"
)

array_expr <- extract_assigned_array(js_text)

if (is.null(array_expr) || !nzchar(array_expr)) {
  stop("Could not extract the quantLabBlogPosts array from js/blog-posts-data.js")
}

ctx <- V8::v8()
invisible(ctx$eval(paste0("var __quantlab_posts__ = ", array_expr)))
posts_json <- ctx$eval("JSON.stringify(__quantlab_posts__)")

if (is.null(posts_json) || !is.character(posts_json) || length(posts_json) != 1 || !nzchar(posts_json)) {
  stop("Could not serialize extracted blog post data.")
}

posts <- jsonlite::fromJSON(posts_json, simplifyDataFrame = TRUE)

if (is.null(posts) || nrow(posts) == 0) {
  stop("No blog posts found in js/blog-posts-data.js")
}

posts <- as.data.frame(posts, stringsAsFactors = FALSE)

# ------------------------------------------------------------
# Sort posts
# ------------------------------------------------------------

order_sort <- suppressWarnings(as.numeric(get_col(posts, "order", Inf)))
order_sort[is.na(order_sort)] <- Inf
posts <- posts[order(order_sort), , drop = FALSE]

# ------------------------------------------------------------
# Build RSS items
# ------------------------------------------------------------

titles     <- get_col(posts, "title", "")
urls1      <- get_col(posts, "canonicalUrl", "")
urls2      <- get_col(posts, "url", "")
excerpts   <- get_col(posts, "excerpt", "")
sources    <- get_col(posts, "source", "")
categories <- get_col(posts, "category", "Blog")
authors    <- get_col(posts, "author", "The QuantLab")
published  <- get_col(posts, "published", "")

items <- character(0)

for (i in seq_len(nrow(posts))) {
  item_url <- normalize_url(
    ifelse(!is.na(urls1[i]) && trimws(urls1[i]) != "", urls1[i], urls2[i]),
    SITE_URL
  )
  
  if (is.na(item_url) || trimws(item_url) == "") {
    message(sprintf(
      "Skipping post with missing URL: %s",
      ifelse(is.na(titles[i]) || titles[i] == "", "<untitled>", titles[i])
    ))
    next
  }
  
  excerpt <- ifelse(is.na(excerpts[i]), "", excerpts[i])
  source  <- ifelse(is.na(sources[i]), "", sources[i])
  
  if (trimws(source) != "") {
    description <- paste0(excerpt, " Originally published at ", source, ".")
  } else {
    description <- excerpt
  }
  
  parts <- c(
    "  <item>",
    sprintf("    <title>%s</title>", to_cdata(titles[i])),
    sprintf("    <link>%s</link>", xml_escape(item_url)),
    sprintf('    <guid isPermaLink="true">%s</guid>', xml_escape(item_url)),
    sprintf("    <description>%s</description>", to_cdata(description)),
    sprintf("    <category>%s</category>", to_cdata(categories[i])),
    sprintf("    <author>blog@thequantlab.org (%s)</author>", xml_escape(authors[i]))
  )
  
  if (!is.na(published[i]) && trimws(published[i]) != "") {
    pub_line <- tryCatch(
      sprintf("    <pubDate>%s</pubDate>", format_pubdate(published[i])),
      error = function(e) {
        message(sprintf(
          "Skipping bad published date for %s: %s (%s)",
          ifelse(is.na(titles[i]) || titles[i] == "", "<untitled>", titles[i]),
          published[i],
          e$message
        ))
        NULL
      }
    )
    
    if (!is.null(pub_line)) {
      parts <- c(parts, pub_line)
    }
  }
  
  parts <- c(parts, "  </item>")
  items <- c(items, paste(parts, collapse = "\n"))
}

# ------------------------------------------------------------
# Build feed
# ------------------------------------------------------------

feed_lines <- c(
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0">',
  "<channel>",
  sprintf("  <title>%s</title>", to_cdata("The QuantLab Blog")),
  sprintf("  <link>%s</link>", xml_escape(BLOG_URL)),
  sprintf(
    "  <description>%s</description>",
    to_cdata("Selected public writing and short-form essays connected to QuantLab research.")
  ),
  "  <language>en-us</language>",
  sprintf(
    "  <lastBuildDate>%s</lastBuildDate>",
    format(Sys.time(), "%a, %d %b %Y %H:%M:%S GMT", tz = "GMT")
  ),
  items,
  "</channel>",
  "</rss>",
  ""
)

writeLines(feed_lines, FEED_FILE, useBytes = TRUE)
message(sprintf("Updated %s", FEED_FILE))