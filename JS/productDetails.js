// Get product id from URL
const params = new URLSearchParams(window.location.search);
const productID = params.get("id");

const productDetails = document.getElementById("productDetails");

async function fetchProductDetails(id) {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    const product = await res.json();

    productDetails.innerHTML = `
      <div class="col-md-6">
            <button class="backBtn" onclick="history.back()">
              <i class="fa-solid fa-angles-left"></i>
              <span>Back To Products</span>
            </button>
            <div class="details">
              <div class="pic col-md-5">
                <img src="../assets/images/Tshirt.webp" />
              </div>

              <div class="info col-md-7">
                <h2>${product.title}</h2>
                <p>Category: <span>${product.category?.name}</span></p>
                <p>$ <span>${product.price}</span></p>
                <p>
                  ${product.description}
                </p>
              </div>
            </div>
          </div>
    `;
  } catch (err) {
    console.error("Error fetching product details:", err);
    productDetails.innerHTML = `<p class="text-danger">Error loading product details</p>`;
  }
}

// Initial Load
if (productID) {
  fetchProductDetails(productID);
} else {
  productDetails.innerHTML = `<p class="text-danger">No product selected</p>`;
}
