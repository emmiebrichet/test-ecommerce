document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartContainer = document.getElementById("cart-container");
  const cartAside = document.getElementById("cart-aside");
  const validateCartBtn = document.getElementById("validate-cart");
  const clearCartBtn = document.getElementById("clear-cart");
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logout-btn");

  // Fonction pour savoir si l'utilisateur est connecté
  function isUserLoggedIn() {
    return !!localStorage.getItem("user");
  }

  // Met à jour l'affichage connexion/déconnexion dans le header
  function updateLoginDisplay() {
    if (isUserLoggedIn()) {
      loginLink.style.display = "none";
      logoutBtn.style.display = "inline-block";
    } else {
      loginLink.style.display = "inline-block";
      logoutBtn.style.display = "none";
    }
  }

  updateLoginDisplay(); // Mise à jour au chargement

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    updateLoginDisplay();
    // Optionnel : vider le panier au logout
    localStorage.removeItem("cart");
    renderCart();
  });

  // Afficher les produits
  PRODUCTS.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price.toFixed(2)} €</p>
      <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
    `;
    productList.appendChild(div);
  });

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
      cartAside.style.display = "none";
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

    cartAside.style.display = "block";

    // Affiche le bouton Valider seulement si connecté
    validateCartBtn.style.display = isUserLoggedIn() ? "inline-block" : "none";
  }

  // Ajouter au panier
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      if (!isUserLoggedIn()) {
        alert("Veuillez vous connecter pour ajouter au panier.");
        return;
      }

      const id = parseInt(button.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });

  // Vider le panier
  clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCart();
  });

  // Valider le panier
  validateCartBtn.addEventListener("click", () => {
    alert("Merci pour votre commande ! 🎉");
    localStorage.removeItem("cart");
    renderCart();
  });

  // Afficher le panier s’il existe déjà au chargement
  if (isUserLoggedIn() && JSON.parse(localStorage.getItem("cart"))?.length > 0) {
    renderCart();
  }
});

