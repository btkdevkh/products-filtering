// Data
const products = [
  {
    id: 1,
    name: "Macbook air M3",
    category: "laptops",
    url: "images/macbook_air_m3.png",
    price: 1299.99,
  },
  {
    id: 2,
    name: "GTA 6",
    category: "games",
    url: "images/gta_6.png",
    price: 99.99,
  },
  {
    id: 3,
    name: "Iphone SE 4gen",
    category: "smartphones",
    url: "images/iphone_se.png",
    price: 579.99,
  },
  {
    id: 4,
    name: "Koorui 34",
    category: "televisions",
    url: "images/koorui_34.png",
    price: 179.99,
  },
  {
    id: 5,
    name: "Ninkear N16 Pro",
    category: "laptops",
    url: "images/ninkear_n16_pro.png",
    price: 699.99,
  },
];
products.sort((a, b) => a.category.localeCompare(b.category));

let cartCount = 0;
const cartProducts = [];

// DOM
const productsWrapperEl = document.getElementById("products-wrapper");
const checkboxs = document.querySelectorAll(".check");
const cartCountEl = document.getElementById("cart-count");
const searchEl = document.getElementById("search");
const filtersContainerEl = document.getElementById("filters-container");

function displayProducts(products) {
  productsWrapperEl.innerHTML = "";

  products.forEach((product) => {
    const item = createProduct(product);
    cartProducts.push(item);
    productsWrapperEl.appendChild(item);
  });
}

function updateCartCount() {
  const count = cartProducts.reduce((acc, curr) => {
    if (curr.textContent.includes("Remove From cart")) {
      acc++;
    }

    return acc;
  }, 0);

  cartCountEl.textContent = count;
}

function createProduct(product) {
  const divEl = document.createElement("div");

  divEl.innerHTML = `
    <div
      data-category="${product.category}"
      class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl"
    >
      <img
        src="${product.url}"
        alt="${product.name}"
        class="w-full h-32 object-cover"
      />
      <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
        >Add To Cart</button
      >
    </div>
    <p class="text-xl">${product.name}</p>
    <strong>€${product.price.toLocaleString()}</strong>
  `;

  divEl.querySelector(".status").addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("added")) {
      target.classList.remove("added");
      target.classList.remove("bg-red-700");
      target.textContent = "Add To cart";

      updateCartCount();
    } else {
      target.classList.add("added");
      target.classList.add("bg-red-700");
      target.textContent = "Remove From cart";

      updateCartCount();
    }
  });

  return divEl;
}

function searchFilterProducts(e) {
  const searchTerm = searchEl.value.trim().toLowerCase();
  const checks = Array.from(checkboxs)
    .filter((f) => f.checked)
    .map((m) => m.id);

  // Solotion 2 (short)
  cartProducts.forEach((cartProduct, idx) => {
    const product = products[idx];

    const matchedSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const matchedCategory =
      checks.length === 0 || checks.includes(product.category);

    if (matchedSearchTerm && matchedCategory) {
      cartProduct.classList.remove("hidden");
    } else {
      cartProduct.classList.add("hidden");
    }
  });

  // Solution 1 (long)
  // products.forEach((product, idx) => {
  //   const isChecked = checks.length > 0;

  //   if (isChecked == false) {
  //     if (product.name.toLowerCase().includes(searchTerm)) {
  //       cartProducts[idx].classList.remove("hidden");
  //     } else {
  //       cartProducts[idx].classList.add("hidden");
  //     }
  //     return;
  //   }

  //   if (
  //     product.name.toLowerCase().includes(searchTerm) &&
  //     checks.includes(product.category)
  //   ) {
  //     cartProducts[idx].classList.remove("hidden");
  //   } else {
  //     cartProducts[idx].classList.add("hidden");
  //   }
  // });
}

// Event listeners
displayProducts(products);
searchEl.addEventListener("input", searchFilterProducts);
filtersContainerEl.addEventListener("change", searchFilterProducts);
