document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  const errorMsg = document.getElementById("error-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Appel à la fonction login définie globalement dans auth.js
    if (login(email, password)) {
      localStorage.setItem("user", email);
      window.location.href = "index.html?showCart=true";
    } else {
      errorMsg.textContent = "Erreur dans l'identifiant ou le mot de passe.";
    }
  });
});
