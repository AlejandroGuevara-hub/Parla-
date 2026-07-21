document.body.classList.add('js-animations-ready');

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
