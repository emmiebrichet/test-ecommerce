document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  const confirmationMsg = document.getElementById("confirmation-msg");

  form.addEventListener("submit", e => {
    e.preventDefault();

    // On vide le panier
    localStorage.removeItem("cart");

    // On affiche le message de confirmation
    confirmationMsg.textContent = "Merci pour votre commande !";

    // On réinitialise le formulaire
    form.reset();

    // Après 3 secondes, on redirige vers la page d'accueil (sans connexion)
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  });
});
