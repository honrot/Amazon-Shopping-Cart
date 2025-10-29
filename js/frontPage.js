import Products from './products.js';

// Simple cart structure
let cart = [];

// Add product to cart by id
function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
    if (product) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart(); // Update cart display
    }
}

// Remove product from cart by id
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart(); // Update cart display
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Render cart to HTML
function renderCart() {
    const cartContainer = document.getElementById('cart');
    if (!cartContainer) return;
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    const ul = document.createElement('ul');
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFromCart(item.id);
        li.appendChild(removeBtn);
        ul.appendChild(li);
    });
    cartContainer.appendChild(ul);

    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total: $${getCartTotal().toFixed(2)}`;
    cartContainer.appendChild(totalDiv);
}

// Attach addToCart to product buttons
function setupProductButtons() {
    Products.forEach(product => {
        const btn = document.getElementById(`add-to-cart-${product.id}`);
        if (btn) {
            btn.onclick = () => addToCart(product.id);
        }
    });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setupProductButtons();
    renderCart();
});

export { addToCart, removeFromCart, getCartTotal };