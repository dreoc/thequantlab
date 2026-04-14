// I render the highlights as a horizontally scrollable strip so visitors can drag, swipe, or use the bottom scrollbar.
(function () {
  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildCard(item) {
    var action = item.url
      ? '<a class="ql-highlight-link" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener"><span>Read more</span></a>'
      : '<div class="ql-highlight-link ql-highlight-link-static"><span>More soon</span></div>';

    return '' +
      '<article class="ql-highlight-card">' +
        '<div class="ql-highlight-meta">' +
          '<span class="ql-highlight-type">' + escapeHtml(item.type) + '</span>' +
          '<span class="ql-highlight-tag">' + escapeHtml(item.tag) + '</span>' +
        '</div>' +
        '<div class="ql-highlight-date">' + escapeHtml(item.date) + '</div>' +
        '<h6>' + escapeHtml(item.title) + '</h6>' +
        '<p>' + escapeHtml(item.summary) + '</p>' +
        '<div class="ql-highlight-source">' + escapeHtml(item.source) + (item.location ? ' · ' + escapeHtml(item.location) : '') + '</div>' +
        action +
      '</article>';
  }

  function renderHighlights(items) {
    var track = document.getElementById('highlightsScrollTrack');
    var empty = document.getElementById('highlightsEmptyState');
    if (!track || !empty) return;

    if (!items.length) {
      track.innerHTML = '';
      empty.style.display = 'block';
      return;
    }

    empty.style.display = 'none';
    track.innerHTML = items.map(buildCard).join('');
    track.scrollLeft = 0;
  }

  function initHighlights() {
    var allItems = Array.isArray(window.quantLabHighlights) ? window.quantLabHighlights.slice() : [];
    var searchInput = document.getElementById('highlightsSearch');
    if (!searchInput) return;

    renderHighlights(allItems);

    searchInput.addEventListener('input', function () {
      var query = (searchInput.value || '').toLowerCase().trim();
      if (!query) {
        renderHighlights(allItems);
        return;
      }

      var filtered = allItems.filter(function (item) {
        return [item.type, item.tag, item.date, item.title, item.summary, item.source, item.location]
          .join(' ')
          .toLowerCase()
          .indexOf(query) !== -1;
      });

      renderHighlights(filtered);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHighlights);
  } else {
    initHighlights();
  }
})();
