document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const validateCartBtn = document.getElementById("validate-cart");
  const clearCartBtn = document.getElementById("clear-cart");
  const openCartBtn = document.getElementById("open-cart-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartModal = document.getElementById("cart-modal");

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
      validateCartBtn.style.display = "none";
      clearCartBtn.style.display = "none";
      return;
    }

    clearCartBtn.style.display = "inline-block";
    validateCartBtn.style.display = "inline-block";

    const ul = document.createElement("ul");
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} €`;
      ul.appendChild(li);
      total += item.price * item.quantity;
    });

    cartContainer.innerHTML = "";
    cartContainer.appendChild(ul);

    const totalEl = document.createElement("p");
    totalEl.style.fontWeight = "bold";
    totalEl.textContent = `Total : ${total.toFixed(2)} €`;
    cartContainer.appendChild(totalEl);
  }

  openCartBtn.addEventListener("click", () => {
    renderCart();
    cartModal.style.display = "flex"; // ou 'block' selon ton CSS
  });

  closeCartBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  clearCartBtn.addEventListener("click", () => {
    if (confirm("Voulez-vous vraiment vider le panier ?")) {
      saveCart([]);
      renderCart();
    }
  });

  validateCartBtn.addEventListener("click", () => {
    // Redirection vers la page de formulaire d'achat
    window.location.href = "checkout.html";
  });

  // Initialisation au chargement
  renderCart();
});
