// I render the blog index from the shared post data so I only have one place to maintain the metadata.
(function () {
  function slugify(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function parseQuery() {
    var params = new URLSearchParams(window.location.search);
    return {
      author: params.get('author') || 'all',
      category: params.get('category') || 'all',
      search: params.get('q') || ''
    };
  }

  function uniqueValues(posts, key) {
    var values = [];
    posts.forEach(function (post) {
      var value = post[key];
      if (value && values.indexOf(value) === -1) values.push(value);
    });
    return values;
  }

  function createButton(label, value, group, isActive) {
    return '<button class="blog-filter-btn' + (isActive ? ' active' : '') + '" data-group="' + group + '" data-value="' + value + '">' + label + '</button>';
  }

  function renderFilterGroup(containerId, group, items, activeValue, labelFormatter) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var html = createButton('All', 'all', group, activeValue === 'all');
    items.forEach(function (item) {
      html += createButton(labelFormatter ? labelFormatter(item) : item, slugify(item), group, slugify(item) === activeValue);
    });
    container.innerHTML = html;
  }

  function matchesSearch(post, query) {
    if (!query) return true;
    var haystack = [post.title, post.author, post.category, post.excerpt, post.source].concat(post.tags || []).join(' ').toLowerCase();
    return haystack.indexOf(query.toLowerCase()) !== -1;
  }

  function renderPosts(posts, state) {
    var container = document.getElementById('blog-posts-grid');
    var empty = document.getElementById('blog-empty-state');
    if (!container) return;

    var filtered = posts.filter(function (post) {
      var authorOk = state.author === 'all' || slugify(post.authorKey || post.author) === state.author;
      var categoryOk = state.category === 'all' || slugify(post.category) === state.category || (post.tags || []).some(function (tag) { return slugify(tag) === state.category; });
      var searchOk = matchesSearch(post, state.search);
      return authorOk && categoryOk && searchOk;
    }).sort(function (a, b) {
      return (a.order || 999) - (b.order || 999);
    });

    if (!filtered.length) {
      container.innerHTML = '';
      if (empty) empty.style.display = 'block';
      return;
    }

    if (empty) empty.style.display = 'none';
    container.innerHTML = filtered.map(function (post) {
      var tags = (post.tags || []).map(function (tag) {
        return '<span class="ql-pill">' + tag + '</span>';
      }).join('');
      return [
        '<article class="ql-card blog-card">',
        '<a class="blog-card-image" href="' + post.url + '" target="_blank" rel="noopener"><img src="' + post.cardImage + '" alt="' + post.title.replace(/"/g, '&quot;') + '"></a>',
        '<div class="subpage-meta">' + post.displayDate + ' · ' + post.author + '</div>',
        '<h4><a href="' + post.url + '" target="_blank" rel="noopener">' + post.title + '</a></h4>',
        '<p>' + post.excerpt + '</p>',
        '<div class="blog-source-note">Originally published at ' + post.source + '. We link to the original source here rather than reproducing the full text.</div>',
        '<div class="blog-tags">' + tags + '</div>',
        '<div class="blog-card-actions"><a href="' + post.url + '" target="_blank" rel="noopener"><button>' + (post.linkLabel || 'Original publication') + '</button></a></div>',
        '</article>'
      ].join('');
    }).join('');
  }

  function updateUrl(state) {
    var params = new URLSearchParams();
    if (state.author && state.author !== 'all') params.set('author', state.author);
    if (state.category && state.category !== 'all') params.set('category', state.category);
    if (state.search) params.set('q', state.search);
    var newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({}, '', newUrl);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var posts = window.quantLabBlogPosts || [];
    var state = parseQuery();
    var authors = uniqueValues(posts, 'author').map(function (author) {
      var post = posts.find(function(p){return p.author===author;});
      return {
        label: author === 'Erik Otárola-Castillo' ? 'Erik' : author === 'Ben Schoville and collaborators' ? 'Ben' : author,
        value: slugify((post && (post.authorKey || post.author)) || author)
      };
    });
    var categories = uniqueValues(posts, 'category');

    var authorContainer = document.getElementById('blog-author-filters');
    if (authorContainer) {
      var authorHtml = createButton('All', 'all', 'author', state.author === 'all');
      authors.forEach(function (author) {
        authorHtml += createButton(author.label, author.value, 'author', author.value === state.author);
      });
      authorContainer.innerHTML = authorHtml;
    }

    renderFilterGroup('blog-category-filters', 'category', categories, state.category, function (item) { return item; });

    var searchInput = document.getElementById('blog-search');
    if (searchInput) searchInput.value = state.search;

    renderPosts(posts, state);

    document.addEventListener('click', function (event) {
      var button = event.target.closest('.blog-filter-btn');
      if (!button) return;
      var group = button.getAttribute('data-group');
      var value = button.getAttribute('data-value');
      state[group] = value;
      updateUrl(state);
      document.querySelectorAll('.blog-filter-btn[data-group="' + group + '"]').forEach(function (btn) {
        btn.classList.toggle('active', btn === button);
      });
      renderPosts(posts, state);
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        state.search = searchInput.value.trim();
        updateUrl(state);
        renderPosts(posts, state);
      });
    }
  });
})();
