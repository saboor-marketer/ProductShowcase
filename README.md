# TechStore - Product Showcase

A responsive product showcase website built with HTML, CSS, JavaScript, and Bootstrap 5. The website features a modern design with product filtering, sorting, and detailed product views.

## Features

- **Responsive Design**: Works on all device sizes
- **Product Grid**: Beautifully displayed products with hover effects
- **Filtering**: Filter products by category
- **Sorting**: Sort products by price and name
- **Search**: Search for products by name or description
- **Product Details**: Modal popup with detailed product information
- **Animations**: Smooth animations and transitions

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (ES6+)
- [Bootstrap 5](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/) for icons

## Getting Started

1. Clone the repository
2. Open `index.html` in a web browser
3. No build process or dependencies required

## Project Structure

```
Product Showcase/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Custom styles
├── js/
│   └── script.js      # JavaScript functionality
└── images/            # Product images
```

## Customization

### Colors
Edit the CSS variables in `css/style.css` to change the color scheme:

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --accent-color: #e74c3c;
    --light-gray: #f8f9fa;
    --dark-gray: #343a40;
}
```

### Adding Products
Edit the `products` array in `js/script.js` to add, remove, or modify products.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).
