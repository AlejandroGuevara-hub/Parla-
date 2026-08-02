/* ============================================================
   PARLA! — Sidebar / Drawer de navegación (vistas no-landing)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var sidebar = document.getElementById('sidebar');
  var toggle = document.querySelector('.sidebar-toggle');
  var overlay = document.querySelector('.sidebar-overlay');

  if (!sidebar || !toggle || !overlay) return;

  function abrir() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
  }

  function cerrar() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }

  toggle.addEventListener('click', function () {
    if (sidebar.classList.contains('is-open')) {
      cerrar();
    } else {
      abrir();
    }
  });

  overlay.addEventListener('click', cerrar);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrar();
  });
});
