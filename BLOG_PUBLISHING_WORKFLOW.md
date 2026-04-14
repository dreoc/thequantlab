# QuantLab blog publishing workflow

I keep the blog metadata in one place: `js/blog-posts-data.js`.

## What updates automatically from that file already
- the homepage blog strip (`index.html` via `js/blog-home-strip.js`)
- the full blog page (`pages/blog.html` via `js/blog-index.js`)

## What this helper script updates
- `feed.xml`

## When I publish a new post
1. Add a new entry to `js/blog-posts-data.js`
2. Give it a stable `id`, `title`, `author`, `category`, `excerpt`, and `url`
3. If I know the publication date, add `published` in `YYYY-MM-DD` form
4. Run:

```terminal
# QuantLab blog publishing workflow

I keep the blog metadata in one place: `js/blog-posts-data.js`.

## What updates automatically from that file already
- the homepage blog strip (`index.html` via `js/blog-home-strip.js`)
- the full blog page (`pages/blog.html` via `js/blog-index.js`)

## What this helper script updates
- `feed.xml`

## When I publish a new post
1. Add a new entry to `js/blog-posts-data.js`
2. Give it a stable `id`, `title`, `author`, `category`, `excerpt`, and `url`
3. If I know the publication date, add `published` in `YYYY-MM-DD` form
4. Run in the R terminal:

```terminal
Rscript C:/Users/eotarola/Box/Box_LCA/Documents/website/thequantlab/scripts/generate_feed.R
```

5. Commit the updated files and push to GitHub

## Notes
- The site stays static and GitHub-friendly
- The RSS feed lives at `/feed.xml`
- Social posting can stay manual for now
```

5. Commit the updated files and push to GitHub

## Notes
- The site stays static and GitHub-friendly
- The RSS feed lives at `/feed.xml`
- Social posting can stay manual for now
