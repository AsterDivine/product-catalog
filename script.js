/* PRODUCTS DATA
 */
const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 59.99 },
  { id: 2, name: "Bluetooth Speaker",   category: "Electronics", price: 39.5 },
  { id: 3, name: "Phone Case",          category: "Accessories", price: 12.0 },
  { id: 4, name: "Leather Wallet",      category: "Accessories", price: 24.75 },
  { id: 5, name: "Desk Lamp",           category: "Home",        price: 29.99 },
  { id: 6, name: "Ceramic Mug Set",     category: "Home",        price: 18.5 }
];


const categoryIcons = {
  Electronics: "🎧",
  Accessories: "👜",
  Home: "🏠"
};

/*DISPLAY FUNCTION*/
function displayProducts(list) {
  const grid = document.getElementById("productGrid");
  const count = document.getElementById("productCount");

  grid.innerHTML = "";

  list.forEach(function (product) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML =
      '<div class="product-image" aria-hidden="true">' +
        (categoryIcons[product.category] || "📦") +
      "</div>" +
      '<p class="product-category">' + product.category + "</p>" +
      '<h3 class="product-name">' + product.name + "</h3>" +
      '<p class="product-price">$' + product.price.toFixed(2) + "</p>";
    grid.appendChild(card);
  });

  count.textContent =
    "Showing " + list.length + (list.length === 1 ? " product" : " products");
}

/*FILTER FUNCTION*/
function filterProducts(category) {
  const filtered =
    category === "all"
      ? products
      : products.filter(function (p) { return p.category === category; });

  displayProducts(filtered);
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Update active styling and aria state
      buttons.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      filterProducts(button.dataset.category);
    });
  });
}

/*FORM VALIDATION*/
function setupForm() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name.length < 3) {
      alert("Error: Name must be at least 3 characters long.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert('Error: Email must contain "@" and ".".');
      return;
    }

    if (message.length < 10) {
      alert("Error: Message must be at least 10 characters long.");
      return;
    }

    alert("Success! Your message has been sent.");
    form.reset();
  });
}

/* INITIALIZE*/
displayProducts(products);
setupFilters();
setupForm();
