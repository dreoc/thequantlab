// I render the homepage blog strip from the same shared post data used on the full blog page.
(function () {
  function renderHomeStrip(posts) {
    var container = document.getElementById('blogHomeScroll');
    var empty = document.getElementById('blogHomeEmpty');
    if (!container || !empty) return;

    var featured = (posts || []).slice().sort(function (a, b) {
      return (a.order || 999) - (b.order || 999);
    }).slice(0, 6);

    if (!featured.length) {
      container.innerHTML = '';
      empty.style.display = 'block';
      return;
    }

    empty.style.display = 'none';
    container.innerHTML = featured.map(function (post) {
      var safeTitle = String(post.title || '').replace(/"/g, '&quot;');
      return [
        '<article class="blog-home-card ql-card">',
        '<div class="small-label">' + (post.category || 'Blog') + '</div>',
        '<div class="subpage-meta">' + (post.displayDate || '') + ' · ' + (post.author || '') + '</div>',
        '<h4>' + (post.title || '') + '</h4>',
        '<p>' + (post.excerpt || '') + '</p>',
        '<a class="blog-home-link" href="' + (post.url || 'pages/blog.html') + '" target="_blank" rel="noopener" aria-label="Open ' + safeTitle + '"><span>' + (post.linkLabel || 'Original publication') + '</span></a>',
        '</article>'
      ].join('');
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHomeStrip(window.quantLabBlogPosts || []);
  });
})();
