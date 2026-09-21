const CLAVE = 'parla-favoritos';

export function obtenerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
}

export function esFavorito(tipo, id) {
  return obtenerFavoritos().some(f => f.tipo === tipo && f.id === id);
}

export function alternarFavorito(item) {
  const favoritos = obtenerFavoritos();
  const indice = favoritos.findIndex(f => f.tipo === item.tipo && f.id === item.id);
  if (indice >= 0) {
    favoritos.splice(indice, 1);
  } else {
    favoritos.push({ ...item, fechaGuardado: new Date().toISOString() });
  }
  localStorage.setItem(CLAVE, JSON.stringify(favoritos));
  return indice < 0;
}
