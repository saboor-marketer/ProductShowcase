// Product data
const products = [
    {
        id: 1,
        name: 'Apple Watch Series 10',
        price: 399,
        category: 'wearables',
        image: 'Apple watch series 10.jpg',
        description: 'The latest Apple Watch with advanced health monitoring and fitness tracking features.',
        specs: [
            'Always-On Retina display',
            'Blood Oxygen app',
            'ECG app',
            'High and low heart rate notifications',
            'Water resistant 50 meters'
        ],
        rating: 4.8
    },
    {
        id: 2,
        name: 'AirPods 3',
        price: 179,
        category: 'audio',
        image: 'airpods 3.jpg',
        description: 'Immersive sound with Adaptive EQ and spatial audio for a magical listening experience.',
        specs: [
            'Spatial audio with dynamic head tracking',
            'Adaptive EQ',
            'Sweat and water resistant',
            'Up to 6 hours of listening time',
            'Wireless charging case'
        ],
        rating: 4.7
    },
    {
        id: 3,
        name: 'AirPods Pro',
        price: 249,
        category: 'audio',
        image: 'airpods pro.jpg',
        description: 'Active Noise Cancellation and customizable fit for an unparalleled audio experience.',
        specs: [
            'Active Noise Cancellation',
            'Transparency mode',
            'Sweat and water resistant',
            'Up to 4.5 hours of listening time',
            'Wireless charging case included'
        ],
        rating: 4.9
    },
    {
        id: 4,
        name: 'AirPods Max',
        price: 549,
        category: 'audio',
        image: 'airpods-max.jpg',
        description: 'High-fidelity audio with Active Noise Cancellation and spatial audio.',
        specs: [
            'High-fidelity audio',
            'Active Noise Cancellation',
            'Spatial audio with dynamic head tracking',
            'Up to 20 hours of listening time',
            'Digital Crown for volume control'
        ],
        rating: 4.8
    },
    {
        id: 5,
        name: 'Samsung Watch 5',
        price: 279,
        category: 'wearables',
        image: 'samsung5-3.jpg',
        description: 'Advanced health monitoring and fitness tracking with a sleek design.',
        specs: [
            'Body composition analysis',
            'Sleep coaching',
            'Advanced sleep analysis',
            'Water resistant 50m',
            'Up to 40 hours of battery life'
        ],
        rating: 4.6
    },
    {
        id: 6,
        name: '10000mAh Power Bank',
        price: 29.99,
        category: 'accessories',
        image: 'Powerbank 10000mah.jpg',
        description: 'Compact and powerful portable charger for all your devices.',
        specs: [
            '10000mAh capacity',
            'Dual USB ports',
            'LED power indicator',
            'Fast charging support',
            'Compact and portable design'
        ],
        rating: 4.5
    }
];

// DOM Elements
const productsGrid = document.getElementById('products');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');
const searchInput = document.getElementById('searchInput');
const productModal = new bootstrap.Modal(document.getElementById('productModal'));

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupEventListeners();
});

// Display products in the grid
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<div class="col-12 text-center py-5"><h4>No products found</h4></div>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card HTML with dark theme
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4 product-item';
    
    const ratingStars = '★'.repeat(Math.floor(product.rating)) + 
                       '☆'.repeat(5 - Math.ceil(product.rating));
    
    col.innerHTML = `
        <div class="card bg-dark text-white h-100">
            <div class="position-relative">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" 
                     data-bs-toggle="tooltip" data-bs-placement="top" 
                     title="Click for details" loading="lazy">
                <div class="position-absolute top-0 end-0 m-2">
                    <span class="badge bg-primary text-white">${product.category}</span>
                </div>
            </div>
            <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title mb-0 text-white">${product.name}</h5>
                    <div class="text-warning small">${ratingStars}</div>
                </div>
                <p class="card-text text-muted small mb-3 flex-grow-1">${product.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                    <span class="price fw-bold text-primary">$${product.price.toFixed(2)}</span>
                    <button class="btn btn-sm btn-primary view-details" data-id="${product.id}">
                        <i class="fas fa-eye text-white me-1"></i> Details
                    </button>
                </div>
            </div>
        </div>
    `;
    return col;
}

// Setup event listeners
function setupEventListeners() {
    // Filter by category
    categoryFilter.addEventListener('change', filterAndSortProducts);
    
    // Sort products
    sortBy.addEventListener('change', filterAndSortProducts);
    
    // Search functionality
    searchInput.addEventListener('input', filterAndSortProducts);
    
    // View product details
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                showProductDetails(product);
            }
        }
    });
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Filter and sort products based on user selection
function filterAndSortProducts() {
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort products
    const sortValue = sortBy.value;
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        // Default is 'featured', no sorting needed
    }
    
    displayProducts(filteredProducts);
}

// Show product details in modal with dark theme
function showProductDetails(product) {
    const modalBody = document.getElementById('productModalBody');
    const modalTitle = document.getElementById('productModalLabel');
    
    const fullStars = '★'.repeat(Math.floor(product.rating));
    const emptyStars = '☆'.repeat(5 - Math.ceil(product.rating));
    
    modalTitle.textContent = product.name;
    modalBody.innerHTML = `
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="position-relative rounded-3 overflow-hidden bg-dark" style="height: 350px;">
                    <img src="${product.image}" class="img-fluid h-100 w-100 object-fit-cover" alt="${product.name}">
                </div>
            </div>
            <div class="col-lg-6">
                <div class="d-flex align-items-center mb-3">
                    <div class="text-warning me-2">${fullStars}${emptyStars}</div>
                    <span class="text-muted">(${product.rating}/5.0)</span>
                </div>
                <h3 class="h2 mb-3 text-white">$${product.price.toFixed(2)}</h3>
                <p class="lead mb-4 text-white">${product.description}</p>
                
                <h5 class="mb-3 text-white">Specifications:</h5>
                <ul class="list-unstyled">
                    ${product.specs.map(spec => `
                        <li class="mb-2">
                            <i class="fas fa-check-circle text-success me-2"></i>${spec}
                        </li>
                    `).join('')}
                </ul>
                
                <div class="d-grid gap-2 mt-4">
                    <button class="btn btn-primary btn-lg py-3 text-white bg-dark">
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                    <button class="btn btn-outline-light" data-bs-dismiss="modal">
                        <i class="fas fa-arrow-left me-2"></i>Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

// Initialize popovers
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});
