document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    errorMsg.textContent = ""; // Nettoie le message d'erreur à chaque nouvelle soumission

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Exemple simple : remplacer par ton appel API si besoin
    if (email === "test@test.com" && password === "1234") {
      localStorage.setItem("user", email);
      window.location.href = "index.html";
    } else {
      errorMsg.textContent = "Erreur dans l'identifiant ou le mot de passe.";
    }
  });
});
