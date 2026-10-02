// David Techs & Gadgets
// Simple JavaScript for search, filtering and cart interaction.

const products = [
    {
        id: 1,
        name: "ipone 16 pro used 256gb",
        category: "Phones",
        price: 1450000,
        icon: "bi-phone",
        description: "Modern smartphone with a bright display and fast performance."
    },
    {
        id: 2,
        name: "samsung Galaxy s22+ 5g 128",
        category: "Phones",
        price: 320000,
        icon: "bi-phone-fill",
        description: "Stylish phone for communication, entertainment and everyday use."
    },
    {
        id: 3,
        name: "MacBook Air 2021 14",
        category: "Laptops",
        price: 1850000,
        icon: "bi-laptop",
        description: "Lightweight laptop for school, coding and everyday tasks." 
    },
    {
        id: 4,
        name: "hp probook 15",
        category: "Laptops",
        price: 1200000,
        icon: "bi-laptop-fill",
        description: "Powerful laptop for productivity and software development."
    },
    {
        id: 5,
        name: "BassBeat Headphones",
        category: "Audio",
        price: 95000,
        icon: "bi-headphones",
        description: "Comfortable headphones for music and entertainment."
    },
    {
        id: 6,
        name: "Wireless Earbuds",
        category: "Audio",
        price: 65000,
        icon: "bi-earbuds",
        description: "Compact wireless earbuds for music and calls."
    },
    {
        id: 7,
        name: "Smart Watch S1",
        category: "Accessories",
        price: 85000,
        icon: "bi-smartwatch",
        description: "A simple smartwatch for notifications and everyday convenience."
    },
    {
        id: 8,
        name: "Fast USB-C Charger",
        category: "Accessories",
        price: 25000,
        icon: "bi-lightning-charge",
        description: "Compact charging accessory for compatible devices."
    }
];

let selectedCategory = "All";
let searchTerm = "";
let cart = 0;

const productGrid = document.getElementById("productGrid");
const noProducts = document.getElementById("noProducts");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const toastMessage = document.getElementById("toastMessage");
const siteToast = document.getElementById("siteToast");

function formatPrice(price) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(price);
}

function showToast(message) {
    toastMessage.textContent = message;

    const toast = new bootstrap.Toast(siteToast);
    toast.show();
}

function displayProducts() {

    const filteredProducts = products.filter(product => {

        const categoryMatch =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const text =
            `${product.name} ${product.category} ${product.description}`
            .toLowerCase();

        const searchMatch =
            text.includes(searchTerm.toLowerCase());

        return categoryMatch && searchMatch;
    });

    productGrid.innerHTML = "";

    if (filteredProducts.length === 0) {
        noProducts.classList.remove("d-none");
        return;
    }

    noProducts.classList.add("d-none");

    filteredProducts.forEach(product => {

        const productHTML = `
            <div class="col-sm-6 col-lg-3">
                <div class="card h-100 shadow-sm">

                    <div class="bg-light text-primary text-center py-5">
                        <i class="bi ${product.icon} display-3"></i>
                    </div>

                    <div class="card-body d-flex flex-column">

                        <small class="text-secondary text-uppercase fw-bold">
                            ${product.category}
                        </small>

                        <h5 class="card-title fw-bold mt-2">
                            ${product.name}
                        </h5>

                        <p class="card-text text-secondary small">
                            ${product.description}
                        </p>

                        <div class="mt-auto">

                            <h5 class="fw-bold">
                                ${formatPrice(product.price)}
                            </h5>

                            <button
                                class="btn btn-dark w-10 add-cart-button"
                                data-id="${product.id}">
                                <i class="bi bi-cart-plus me-1"></i>
                                Add to Cart
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        `;

        productGrid.insertAdjacentHTML("beforeend", productHTML);
    });

    document.querySelectorAll(".add-cart-button").forEach(button => {

        button.addEventListener("click", () => {

            const productId = Number(button.dataset.id);

            const product = products.find(
                item => item.id === productId
            );

            cart++;
            cartCount.textContent = cart;

            showToast(`${product.name} was added to your cart.`);
        });
    });
}


// Search
searchInput.addEventListener("input", event => {
    searchTerm = event.target.value;
    displayProducts();
});


// Filter buttons
document.querySelectorAll(".filter-button").forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.filter;

        document.querySelectorAll(".filter-button").forEach(btn => {
            btn.classList.remove("btn-dark", "active");
            btn.classList.add("btn-outline-dark");
        });

        button.classList.remove("btn-outline-dark");
        button.classList.add("btn-dark", "active");

        displayProducts();
    });
});


// Category buttons
document.querySelectorAll(".category-button").forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        document.querySelectorAll(".filter-button").forEach(filter => {

            const selected =
                filter.dataset.filter === selectedCategory;

            filter.classList.toggle("btn-dark", selected);
            filter.classList.toggle("active", selected);
            filter.classList.toggle("btn-outline-dark", !selected);
        });

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });

        displayProducts();
    });
});


// Cart button
document.getElementById("cartButton").addEventListener("click", () => {

    if (cart === 0) {
        showToast("Your cart is empty.");
    } else {
        showToast(
            `You have ${cart} item${cart === 1 ? "" : "s"} in your cart.`
        );
    }
});


// // Contact form
// document.getElementById("contactForm").addEventListener("submit", event => {

//     event.preventDefault();

//     const name = document.getElementById("name").value;

//     showToast(`Thanks ${name}! Your message has been received.`);

//     event.target.reset();
// });


// // Current year
// document.getElementById("year").textContent =
//     new Date().getFullYear();


// // Load products
// displayProducts();


// Contact form
document.getElementById("contactForm").addEventListener("submit", event => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate name
    if (name === "") {
        showToast("Please enter your name.");
        return;
    }

    if (name.length < 3) {
        showToast("Name must be at least 3 characters.");
        return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showToast("Please enter your email.");
        return;
    }

    if (!emailPattern.test(email)) {
        showToast("Please enter a valid email address.");
        return;
    }

    // Validate message
    if (message === "") {
        showToast("Please enter your message.");
        return;
    }

    if (message.length < 10) {
        showToast("Message must be at least 10 characters.");
        return;
    }

    // If all validation passes
    showToast(`Thanks ${name}! Your message has been received.`);

    event.target.reset();
});