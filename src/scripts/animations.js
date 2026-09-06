document.body.classList.add('js-animations-ready');

window.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('page-loaded');
});

/* ============================================================
   INTERSECTION OBSERVER para .animate-in (con soporte dinámico)
   ============================================================ */

var animateIndex = 0;

function observeAnimateIn(el) {
  el.style.transitionDelay = (animateIndex % 6) * 80 + 'ms';
  animateIndex++;
  animateObserver.observe(el);
}

var animateObserver = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('is-visible');
      animateObserver.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

// 1. Observar elementos .animate-in existentes al cargar
document.querySelectorAll('.animate-in').forEach(observeAnimateIn);

// 2. MutationObserver para detectar NUEVOS .animate-in añadidos dinámicamente (fetch)
new MutationObserver(function (mutations) {
  mutations.forEach(function (m) {
    m.addedNodes.forEach(function (node) {
      if (node.nodeType !== 1) return; // solo Element nodes
      if (node.matches('.animate-in')) {
        observeAnimateIn(node);
      }
      var nuevos = node.querySelectorAll('.animate-in');
      nuevos.forEach(observeAnimateIn);
    });
  });
}).observe(document.body, { childList: true, subtree: true });

// 3. MutationObserver para detectar .animate-in AÑADIDO COMO CLASE a elementos YA EXISTENTES
new MutationObserver(function (mutations) {
  mutations.forEach(function (m) {
    if (m.type === 'attributes' && m.attributeName === 'class') {
      var target = m.target;
      if (target.classList.contains('animate-in') && !target.dataset.animObserved) {
        target.dataset.animObserved = 'true'; // evita duplicados
        observeAnimateIn(target);
      }
    }
  });
}).observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

/* ============================================================
   PARALLAX HERO (extremadamente sutil)
   ============================================================ */

var heroBg = document.querySelector('.hero__bg');
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var enMovimiento = false;

function parallaxHero() {
  enMovimiento = false;
  if (!heroBg || reduceMotion) return;
  var hero = heroBg.parentElement;
  var rect = hero.getBoundingClientRect();
  // La imagen es un background de la sección: se recorta siempre dentro de ella
  // (por definición), así el parallax nunca saca la imagen del marco ni deja
  // ver el fondo del body. Solo se desplaza cuando el hero sube.
  var avance = -rect.top * 0.2;
  if (avance < 0) avance = 0;
  var max = 24;
  if (avance > max) avance = max;
  heroBg.style.backgroundPosition = 'center ' + avance + 'px';
}

function onScroll() {
  if (!enMovimiento) {
    enMovimiento = true;
    requestAnimationFrame(parallaxHero);
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ============================================================
   IMÁGENES: blur + fade al terminar de cargar (con soporte dinámico)
   ============================================================ */

function setupImage(img) {
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
}

// 1. Imágenes existentes al cargar
document.querySelectorAll('img').forEach(setupImage);

// 2. MutationObserver para NUEVAS imágenes añadidas dinámicamente
new MutationObserver(function (mutations) {
  mutations.forEach(function (m) {
    m.addedNodes.forEach(function (node) {
      if (node.nodeType !== 1) return;
      if (node.tagName === 'IMG') {
        setupImage(node);
      }
      node.querySelectorAll?.('img').forEach(setupImage);
    });
  });
}).observe(document.body, { childList: true, subtree: true });