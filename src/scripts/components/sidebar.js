class ParlaSidebar extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || '';

    const links = [
      { page: 'inicio', href: 'inicio.html', icon: 'fa-house', label: 'Inicio' },
      { page: 'video', href: 'video.html', icon: 'fa-video', label: 'Lecciones en video' },
      { page: 'podcast', href: 'podcast.html', icon: 'fa-headphones', label: 'Podcast' },
      { page: 'webtoon', href: 'webtoon.html', icon: 'fa-book-open', label: 'Webtoon' },
      { page: 'cultura', href: 'cultura.html', icon: 'fa-landmark', label: 'Cultura' },
      { page: 'flashcards', href: 'flashcards.html', icon: 'fa-layer-group', label: 'Flashcards' },
      { page: 'quizzes', href: 'quizzes.html', icon: 'fa-circle-question', label: 'Quizzes' },
      { page: 'contacto', href: 'contacto.html', icon: 'fa-comment', label: 'Contactos' },
    ];

    this.innerHTML = `
      <button class="sidebar-menu-toggle" aria-label="Abrir menú">
        <i class="fa-solid fa-bars"></i>
      </button>
      <div class="sidebar-overlay"></div>
      <aside class="sidebar">
        <a href="index.html" class="sidebar__logo" aria-label="Parla! inicio">
          <img src="../assets/images/logo.png" alt="Parla! logo">
        </a>
        <nav aria-label="Secciones">
          ${links.map(link => `
            <a href="${link.href}" class="sidebar-link ${link.page === current ? 'is-active' : ''}">
              <i class="fa-solid ${link.icon}"></i>
              <span>${link.label}</span>
            </a>
          `).join('')}
        </nav>
      </aside>
    `;

    const toggle = this.querySelector('.sidebar-menu-toggle');
    const sidebar = this.querySelector('.sidebar');
    const overlay = this.querySelector('.sidebar-overlay');
    const icon = toggle?.querySelector('i');

    toggle?.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('is-open');
      overlay.classList.toggle('is-visible');
      if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-xmark', isOpen);
      }
      toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
      toggle.setAttribute('aria-label', 'Abrir menú');
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('is-visible');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
        toggle.setAttribute('aria-label', 'Abrir menú');
      }
    });
  }
}

customElements.define('parla-sidebar', ParlaSidebar);