/* ============================================================
   PARLA! — Navegación e interacciones de UI
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile nav toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  /* --- Formularios: evitar envío real (solo navegación) --- */
  const forms = document.querySelectorAll('form[data-navegar]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const destino = form.getAttribute('data-navegar');
      if (destino) {
        window.location.href = destino;
      }
    });
  });
});
