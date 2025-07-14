document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const loginLink = document.getElementById("login-link");
  const logoutBtn = document.getElementById("logout-btn");

  // Vérifie si l'utilisateur est connecté
  function isUserLoggedIn() {
    return !!localStorage.getItem("user");
  }

  // Met à jour affichage connexion/déconnexion
  function updateLoginDisplay() {
    if (isUserLoggedIn()) {
      loginLink.style.display = "none";
      logoutBtn.style.display = "inline-block";
    } else {
      loginLink.style.display = "inline-block";
      logoutBtn.style.display = "none";
    }
  }

  updateLoginDisplay();

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    updateLoginDisplay();
    alert("Vous êtes déconnecté.");
  });

  // Affichage produits avec bouton "Ajouter au panier"
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

    const btn = div.querySelector(".add-to-cart");
    btn.addEventListener("click", () => {
      if (!isUserLoggedIn()) {
        alert("Veuillez vous connecter pour ajouter au panier.");
        return;
      }
      const id = parseInt(btn.dataset.id);
      const productToAdd = PRODUCTS.find(p => p.id === id);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...productToAdd, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${productToAdd.name} ajouté au panier.`);
    });
  });
});
