// Theme toggle: dark by default, persisted after the first click. Mirrors index.html.
(function() {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  function current() { return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  function syncButton(theme) {
    var next = theme === 'dark' ? 'light' : 'dark';
    var label = 'Switch to ' + next + ' mode';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    syncButton(theme);
  }
  syncButton(current());
  btn.addEventListener('click', function() { apply(current() === 'dark' ? 'light' : 'dark'); });
})();
