// ========================================
// MAISON ARIS - PRODUCT PAGE
// ========================================


// GET PRODUCT ID FROM URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");


// GET ELEMENTS
const leftContainer = document.getElementById("left_container");
const productTitle = document.querySelector(".product-title");
const productColor = document.querySelector(".product-color");


// ========================================
// CHECK PRODUCT ID
// ========================================

if (!productId) {

    productTitle.textContent = "PRODUCT NOT FOUND";
    productColor.textContent = "";

} else {

    loadProduct(productId);

}


// ========================================
// LOAD PRODUCT
// ========================================

async function loadProduct(productId) {

    try {

        // men-001 → men
        // women-001 → women
        const category = productId.split("-")[0];

        if (category !== "men" && category !== "women") {
            throw new Error("Invalid product category");
        }


        // LOAD CORRESPONDING JSON
        const response = await fetch(
            `../catalog/products/${category}.json`
        );


        if (!response.ok) {
            throw new Error(`Failed to load ${category}.json`);
        }


        const products = await response.json();


        // FIND PRODUCT
        const product = products.find(
            item => item.id === productId
        );


        if (!product) {
            throw new Error("Product not found");
        }


        // DISPLAY PRODUCT
        displayProduct(product);


    } catch (error) {

        console.error(error);

        productTitle.textContent = "PRODUCT NOT FOUND";
        productColor.textContent = "";
        leftContainer.innerHTML = "";

    }

}


// ========================================
// DISPLAY PRODUCT
// ========================================

function displayProduct(product) {

    // PRODUCT TITLE
    productTitle.textContent = product.name;


    // PRODUCT COLOUR
    productColor.textContent = product.colour;


    // PRODUCT IMAGE
    leftContainer.innerHTML = `
        <img
            src="${product.image}"
            alt="${product.name}"
            class="product-main-image"
        >
    `;

}


// ========================================
// FIND IN STORE
// ========================================

function findInStore() {

    const selectedSize =
        document.getElementById("size-select").value;


    if (!selectedSize) {

        alert("Please select a size first.");
        return;

    }


    alert("Finding stores with your selected size...");

}