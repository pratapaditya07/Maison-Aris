const params = new URLSearchParams(window.location.search);

const category = params.get("category");

const catalogTitle = document.getElementById("catalog-title");
const productGrid = document.getElementById("product-grid");


/* ========================================
   CHECK CATEGORY
======================================== */

if (category !== "men" && category !== "women") {

    catalogTitle.textContent = "CATALOG";

    productGrid.innerHTML = `
        <p class="catalog-error">
            CATEGORY NOT FOUND
        </p>
    `;

} else {

    catalogTitle.textContent = category.toUpperCase();

    loadProducts(category);

}


/* ========================================
   LOAD PRODUCTS
======================================== */

async function loadProducts(category) {

    try {

        const response = await fetch(
            `products/${category}.json`
        );


        if (!response.ok) {
            throw new Error(
                `Failed to load ${category}.json`
            );
        }


        const products = await response.json();


        displayProducts(products);


    } catch (error) {

        console.error(error);

        productGrid.innerHTML = `
            <p class="catalog-error">
                PRODUCTS COULD NOT BE LOADED
            </p>
        `;

    }

}


/* ========================================
   DISPLAY PRODUCTS
======================================== */

function displayProducts(products) {

    productGrid.innerHTML = "";


    products.forEach(product => {

        const productCard = document.createElement("article");

        productCard.className = "product-card";


        productCard.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <h2>
                    ${product.name}
                </h2>

                <p>
                    ₹${product.price}
                </p>

            </div>

        `;


        productCard.addEventListener("click", () => {

            window.location.href =
                `../product_page/product_page.html?id=${encodeURIComponent(product.id)}`;

        });


        productGrid.appendChild(productCard);

    });

}