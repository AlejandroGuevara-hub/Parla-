class ParlaUserNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="floating-user-nav">
        <a href="perfil.html" aria-label="Perfil"><i class="fa-solid fa-user"></i><span>Perfil</span></a>
        <a href="index.html" aria-label="Cerrar sesión"><i class="fa-solid fa-right-from-bracket"></i><span>Salir</span></a>
      </nav>
    `;
  }
}

customElements.define('parla-user-nav', ParlaUserNav);