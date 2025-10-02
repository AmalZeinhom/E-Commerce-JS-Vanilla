let initPage = 1;
const limitCards = 9; 
let selectedCategory = "";
let minPrice = null;
let maxPrice = null;

//! ================== Fetch Categories ==================
async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  const categories = await res.json();

  const categoryMenu = document.querySelector("#categoryDropdown .dropdown-menu");
  categoryMenu.innerHTML = `<li><a class="dropdown-item" href="#" data-value="">All categories</a></li>`;

  categories.forEach(cat => {
    let li = document.createElement("li");
    li.innerHTML = `<a class="dropdown-item" href="#" data-value="${cat.id}">${cat.name}</a>`;
    categoryMenu.appendChild(li);
  });

  //! category listener 
  categoryMenu.querySelectorAll("a").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      selectedCategory = e.target.getAttribute("data-value");
      document.querySelector("#filter .dropdown:nth-child(1) .btn").textContent = e.target.textContent;
    });
  });
}

//! ================== Fetch Products ==================
async function fetchProducts(page = 1) {
  const offset = (page - 1) * limitCards;
  let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limitCards=${limitCards}`;

  if (selectedCategory) {
    url = `https://api.escuelajs.co/api/v1/categories/${selectedCategory}/products?offset=${offset}&limitCards=${limitCards}`;
  }

  const res = await fetch(url);
  let products = await res.json();

  //! Price Filter
  if (minPrice || maxPrice) {
    products = products.filter(p => {
      return (
        (!minPrice || p.price >= minPrice) &&
        (!maxPrice || p.price <= maxPrice)
      );
    });
  }

  displayProducts(products);

  if (products.length === 0) {
    document.getElementById("rowData").innerHTML = `
      <p class="text-center text-danger">No Products available for this filter</p>
    `;
  }
}

//! ================== Display Products ==================
function displayProducts(products) {
  const container = document.getElementById("rowData");
  container.innerHTML = "";

  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card h-100">
       <a  href="Pages/product-details.html?id=${product.id}" class= "text-decoration-none">
         <img src="./assets/images/no-image-icon.png" class="card-img-top w-50" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <span class="badge">${product.category.name}</span>
          <p class="card-text">${product.description.slice(0,50)}...</p>
          <p class="card-text">$${product.price}</p>
        </div>
       </a>
      </div>
    `;
    container.appendChild(col);
  });
}

//! ================== Apply Filters ==================
document.querySelector(".btn-apply button").addEventListener("click", () => {
  //! Min Price
  const minMenu = document.querySelector("#filter .dropdown:nth-child(2) .btn");
  minPrice = minMenu.textContent.includes("Price") ? null : parseInt(minMenu.textContent);

  //! Max Price
  const maxMenu = document.querySelector("#filter .dropdown:nth-child(3) .btn");
  maxPrice = maxMenu.textContent.includes("Price") ? null : parseInt(maxMenu.textContent);

  fetchProducts(1);
});

//! ================== Reset Filters ==================
document.querySelector(".btn-reset button").addEventListener("click", () => {
  selectedCategory = "";
  minPrice = null;
  maxPrice = null;

  //! Reset UI
  document.querySelector("#filter .dropdown:nth-child(1) .btn").textContent = "Categories";
  document.querySelector("#filter .dropdown:nth-child(2) .btn").textContent = "Min Price";
  document.querySelector("#filter .dropdown:nth-child(3) .btn").textContent = "Max Price";

  fetchProducts(1);
});

//! ================== Init ==================
fetchCategories();
fetchProducts(initPage);
