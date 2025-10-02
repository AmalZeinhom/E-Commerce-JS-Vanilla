const form = document.getElementById("productForm");
const categorySelect = document.getElementById("category");

//! 1. Load categories from API
async function loadCategories() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    const categories = await res.json();

    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      categorySelect.appendChild(option);
    });
  } catch (err) {
    console.error("Error loading categories:", err);
  }
}

// !📌 2. Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    categoryId: parseInt(document.getElementById("category").value),
    images: [document.getElementById("image").value],
  };

  //! Validation
  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.categoryId ||
    !product.images[0]
  ) {
    alert("⚠️ All fields are required!");
    return;
  }

  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error("Failed to create product");

    const newProduct = await res.json();
    alert("✅ Product created successfully!");

    //!Navigate to Products after close Alert
    window.location.href = "index.html";
  } catch (err) {
    console.error("Error creating product:", err);
    alert("❌ Error creating product!");
  }
});

loadCategories();
