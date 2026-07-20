(function () {
  var STORAGE_KEY = 'parla-theme';
  var toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  var icon = toggle.querySelector('i');

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      icon.className = 'fas fa-sun';
      toggle.setAttribute('aria-label', 'Cambiar a tema claro');
    } else {
      document.documentElement.removeAttribute('data-theme');
      icon.className = 'fas fa-moon';
      toggle.setAttribute('aria-label', 'Cambiar a tema oscuro');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }

  setTheme(getTheme());

  toggle.addEventListener('click', function () {
    var current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
})();
