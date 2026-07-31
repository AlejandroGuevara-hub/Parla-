document.body.classList.add('js-animations-ready');

window.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('page-loaded');
});

var elementos = document.querySelectorAll('.animate-in');

var observer = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('is-visible');
      observer.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

elementos.forEach(function (el, index) {
  el.style.transitionDelay = (index % 6) * 80 + 'ms';
  observer.observe(el);
});

/* ---------- Header: estado al hacer scroll (shrink + sombra) ---------- */

var header = document.querySelector('.site-header');

function actualizarHeader() {
  if (!header) return;
  if (window.scrollY > 24) {
    header.classList.add('site-header--scrolled');
  } else {
    header.classList.remove('site-header--scrolled');
  }
}

/* ---------- Parallax extremadamente sutil del hero ---------- */

var heroBg = document.querySelector('.hero__bg');
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var enMovimiento = false;

function parallaxHero() {
  enMovimiento = false;
  if (!heroBg || reduceMotion) return;
  var inicio = heroBg.getBoundingClientRect().top + window.scrollY;
  var avance = window.scrollY - inicio;
  if (avance < 0) avance = 0;
  var max = 30;
  if (avance > max) avance = max;
  heroBg.style.transform = 'translateY(' + avance + 'px) scale(1.08)';
}

function onScroll() {
  actualizarHeader();
  if (!enMovimiento) {
    enMovimiento = true;
    requestAnimationFrame(parallaxHero);
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
actualizarHeader();

/* ---------- Imágenes: blur + fade al terminar de cargar ---------- */

var imagenes = document.querySelectorAll('img');

imagenes.forEach(function (img) {
  img.classList.add('img-load');
  function mostrar() {
    img.classList.add('img-loaded');
  }
  if (img.complete) {
    mostrar();
  } else {
    img.addEventListener('load', mostrar);
    img.addEventListener('error', mostrar);
  }
});
