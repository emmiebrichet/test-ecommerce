document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const validateCartBtn = document.getElementById("validate-cart");
  const clearCartBtn = document.getElementById("clear-cart");
  const openCartBtn = document.getElementById("open-cart-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartModal = document.getElementById("cart-modal");

  function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
      validateCartBtn.style.display = "none";
      clearCartBtn.style.display = "none";
      return;
    }

    clearCartBtn.style.display = "inline-block";
    validateCartBtn.style.display = "inline-block";

    const ul = document.createElement("ul");
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} €`;
      ul.appendChild(li);
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    cartContainer.innerHTML = "";
    cartContainer.appendChild(ul);

    const totalEl = document.createElement("p");
    totalEl.style.fontWeight = "bold";
    totalEl.textContent = `Total: ${total.toFixed(2)} €`;
    cartContainer.appendChild(totalEl);
  }

  openCartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
    renderCart();
  });

  closeCartBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  clearCartBtn.addEventListener("click", () => {
    if (confirm("Voulez-vous vraiment vider le panier ?")) {
      localStorage.removeItem("cart");
      renderCart();
    }
  });

  validateCartBtn.addEventListener("click", () => {
    alert("Merci pour votre commande !");
    localStorage.removeItem("cart");
    renderCart();
    cartModal.style.display = "none";
  });
});
