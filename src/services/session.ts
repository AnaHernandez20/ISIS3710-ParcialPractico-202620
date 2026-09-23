// Pseudo sesión: guardamos el id y el nombre del usuario en el localStorage.
// Ojo: el localStorage solo existe en el navegador, así que estas funciones
// solo se pueden usar en componentes "use client".

export function saveSession(id: string, username: string) {
  localStorage.setItem("id", id);
  localStorage.setItem("username", username);
}

export function getSession() {
  return {
    id: localStorage.getItem("id"),
    username: localStorage.getItem("username"),
  };
}

export function clearSession() {
  localStorage.removeItem("id");
  localStorage.removeItem("username");
}
