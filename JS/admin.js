let currentPage = 1;
const limit = 20;

async function fetchProductsDashboard(page = 1, query = "") {
  const offset = (page - 1) * limit;
  let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

  if (query) {
    url = `https://api.escuelajs.co/api/v1/products/?title=${query}`;
  }

  console.log("Fetching from:", url);

  const res = await fetch(url);
  const data = await res.json();
  console.log("Products fetched:", data);

  display(data);

}


function display(products) {
  const tbody = document.querySelector("#productsTable tbody");
  tbody.innerHTML = "";

  products.forEach((p) => {
    const rowData = `
             <tr>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>${p.category?.name}</td>
        <td>${p.category?.id}</td>
        <td>
          <button onclick="viewProduct(${p.id})" class="btn btn-view">View</button>
          <button onclick="editProduct(${p.id})" class="btn btn-edit">Edit</button>
          <button onclick="deleteProduct(${p.id})" class="btn btn-delete">Delete</button>
        </td>
      </tr>`;
    tbody.innerHTML += rowData;
  });
}

function viewProduct(id) {
  window.location.href = `Pages/product-details.html?id=${id}`;
}

async function deleteProduct(id) {
  if (!confirm("Are you sure?")) return;

  await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "DELETE"
  });

  fetchProductsDashboard(currentPage);
}


document.getElementById("nextBtn").addEventListener("click", () => {
  currentPage++;
  fetchProductsDashboard(currentPage);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchProductsDashboard(currentPage);
  }
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  fetchProductsDashboard(1, query); 
});

fetchProductsDashboard();
