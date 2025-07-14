// javascript/auth.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  const errorMsg = document.getElementById("error-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (email === "test@test.com" && password === "1234") {
      localStorage.setItem("user", email);
      window.location.href = "index.html?showCart=true"; // 👈 redirection avec indicateur
    } else {
      errorMsg.textContent = "Erreur dans l'identifiant ou le mot de passe.";
    }
  });
});
