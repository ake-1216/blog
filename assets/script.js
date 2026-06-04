// ── Collapsible sidebar categories (persisted) ──
(function () {
  var STORAGE_KEY = 'cat_open_state';
  var saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {}

  // Restore saved open state
  document.querySelectorAll('.cat-toggle').forEach(function (el, i) {
    var key = el.getAttribute('data-cat') || 'cat-' + i;
    if (saved[key]) {
      var ul = el.parentElement.querySelector('.cat-pages');
      if (ul) {
        ul.style.display = 'block';
        el.textContent = '▾';
      }
    }
  });
})();

function toggleCat(el) {
  var ul = el.parentElement.querySelector('.cat-pages');
  var open = ul.style.display === 'block';
  ul.style.display = open ? 'none' : 'block';
  el.textContent = open ? '▸' : '▾';

  // Persist state
  var key = el.getAttribute('data-cat');
  var saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem('cat_open_state')) || {};
  } catch (e) {}
  saved[key] = !open;
  sessionStorage.setItem('cat_open_state', JSON.stringify(saved));
}

// ── Mobile hamburger sidebars ──
function toggleSidebar(side) {
  var el = document.getElementById(side === 'left' ? 'left-sidebar' : 'right-sidebar');
  var other = document.getElementById(side === 'left' ? 'right-sidebar' : 'left-sidebar');
  var overlay = document.getElementById('overlay');
  var isOpen = el.classList.contains('open');
  el.classList.toggle('open', !isOpen);
  other.classList.remove('open');
  overlay.classList.toggle('show', !isOpen);
  document.body.classList.toggle('sidebar-open', !isOpen);
}

function closeSidebars() {
  document.getElementById('left-sidebar').classList.remove('open');
  document.getElementById('right-sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.body.classList.remove('sidebar-open');
}

// ── Code block copy button ──
(function () {
  document.querySelectorAll('.main pre').forEach(function (pre) {
    // Trim leading newline from <code> for cleaner display
    var code = pre.querySelector('code');
    if (code && code.innerHTML.startsWith('\n')) {
      code.innerHTML = code.innerHTML.slice(1);
    }
    var wrap = document.createElement('div');
    wrap.className = 'code-block';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = '复制';
    btn.onclick = function () {
      navigator.clipboard.writeText(pre.textContent || '').then(function () {
        btn.textContent = '已复制!';
        setTimeout(function () { btn.textContent = '复制'; }, 2000);
      }).catch(function () { btn.textContent = '失败'; });
    };
    wrap.appendChild(btn);
  });
  // Re-run Prism after wrapping
  if (typeof Prism !== 'undefined') Prism.highlightAll();
})();
