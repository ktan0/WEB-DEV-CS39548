document.addEventListener('DOMContentLoaded', function() {
    // hamburger toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('open');
    });

    navItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
        });
    });

    // simple gallery slider
    const slides = document.querySelectorAll('.gallery-images img');
    let current = 0;
    function showSlide(index) {
        slides.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }
    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }
    showSlide(current);
    setInterval(nextSlide, 3000);

    // Shopping cart state
    const cart = {};
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');

    function formatCurrency(value) {
        return '$' + value.toFixed(2);
    }

    function renderCart() {
        const itemKeys = Object.keys(cart);
        cartItemsEl.innerHTML = '';

        if (itemKeys.length === 0) {
            cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalEl.textContent = 'Total: $0.00';
            return;
        }

        let total = 0;
        itemKeys.forEach(name => {
            const item = cart[name];
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <span class="cart-item-name">${name}</span>
                <span class="cart-item-qty">x${item.quantity}</span>
                <span class="cart-item-price">${formatCurrency(item.price)}</span>
                <span class="cart-item-total">${formatCurrency(itemTotal)}</span>
                <button class="cart-remove" data-name="${name}">Remove</button>
            `;
            cartItemsEl.appendChild(itemEl);
        });

        cartTotalEl.textContent = 'Total: ' + formatCurrency(total);
    }

    function addItemToCart(name, price) {
        if (!cart[name]) {
            cart[name] = { price: price, quantity: 0 };
        }
        cart[name].quantity += 1;
        renderCart();
    }

    function removeItemFromCart(name) {
        if (!cart[name]) return;
        delete cart[name];
        renderCart();
    }

    function clearCart() {
        Object.keys(cart).forEach(name => delete cart[name]);
        renderCart();
    }

    document.querySelectorAll('.menu-item').forEach(menuItem => {
        menuItem.style.cursor = 'pointer';
        menuItem.addEventListener('click', function() {
            const spans = this.querySelectorAll('span');
            const name = spans[0].textContent.trim();
            const priceText = spans[1].textContent.replace('$', '').trim();
            const price = parseFloat(priceText);
            if (!isNaN(price)) {
                addItemToCart(name, price);
            }
        });
    });

    cartItemsEl.addEventListener('click', function(event) {
        if (event.target.matches('.cart-remove')) {
            const itemName = event.target.getAttribute('data-name');
            removeItemFromCart(itemName);
        }
    });

    clearCartBtn.addEventListener('click', function() {
        clearCart();
    });
});