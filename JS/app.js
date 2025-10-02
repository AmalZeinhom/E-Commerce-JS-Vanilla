function loadPage(page) {
  fetch(`./Pages/${page}.html`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("content").innerHTML = data;

      if (page === "products") {
        const script = document.createElement("script");
        script.src = "./JS/products.js";
        document.body.appendChild(script);

        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = "./CSS/products.css";
        document.head.appendChild(style);
      }

      if(page === "admin"){
        const script = document.createElement("script");
        script.src = "./JS/admin.js";
        document.body.appendChild(script);

        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = "./CSS/admin.css";
        document.head.appendChild(style);
      }

      if(page === "create"){
        const script = document.createElement("script");
        script.src = "./JS/create.js";
        document.body.appendChild(script);

        const style = document.createElement('link');
        style.rel = "stylesheet";
        style.href = "./CSS/create.css";
        document.head.appendChild(style);
      }
    })
    .catch((err) => console.log("Error Loading Page", err));
}

loadPage("products");

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    let page = link.getAttribute("data-page");
    loadPage(page);

    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

