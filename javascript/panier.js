document.addEventListener("DOMContentLoaded", () => {
  const openCartBtn = document.getElementById("open-cart-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const cartContainer = document.getElementById("cart-container");
  const validateCartBtn = document.getElementById("validate-cart");
  const clearCartBtn = document.getElementById("clear-cart");

  const isLoggedIn = localStorage.getItem("user");

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
      validateCartBtn.style.display = "none";
      return;
    }

    let total = 0;
    cartContainer.innerHTML = `
      <ul>
        ${cart.map(item => {
          total += item.price * item.quantity;
          return `<li>${item.name} x ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} €</li>`;
        }).join("")}
      </ul>
      <p><strong>Total : ${total.toFixed(2)} €</strong></p>
    `;

    if (isLoggedIn) validateCartBtn.style.display = "inline-block";
  }

  openCartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
    renderCart();
  });

  closeCartBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCart();
  });

  validateCartBtn.addEventListener("click", () => {
    alert("Merci pour votre commande !");
    localStorage.removeItem("cart");
    renderCart();
  });
});
