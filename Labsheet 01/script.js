const products = [
	{
		id: 'moonlit-swordsman',
		name: 'Moonlit Swordsman 1/7 Display Figure',
		category: 'figures',
		label: 'Display Figure',
		price: 12.99,
		oldPrice: 18.99,
		image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=900&q=80',
		description: 'A dynamic shelf-ready figure with layered costume details and a sturdy display base.'
	},
	{
		id: 'after-school-manga',
		name: 'After-School Adventures Manga Starter Set',
		category: 'manga',
		label: 'Manga Bundle',
		price: 10.99,
		oldPrice: 14.99,
		image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=900&q=80',
		description: 'A cheerful starter bundle for readers discovering a new everyday adventure series.'
	},
	{
		id: 'starlight-plush',
		name: 'Starlight Spirit Plush Bag Charm',
		category: 'plush',
		label: 'Plush Charm',
		price: 6.99,
		oldPrice: 9.99,
		image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80',
		description: 'A soft, pocket-sized companion that adds a little character to any backpack.'
	},
	{
		id: 'color-pop-charms',
		name: 'Color Pop Acrylic Charm Collection',
		category: 'keychains',
		label: 'Charm Set',
		price: 4.99,
		oldPrice: 7.99,
		image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=80',
		description: 'Bright acrylic charms for keys, pencil cases, phone straps, and collector boards.'
	},
	{
		id: 'skyline-poster',
		name: 'Neon City Anime Wall Poster',
		category: 'posters',
		label: 'Wall Art',
		price: 8.99,
		oldPrice: 12.99,
		image: 'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?auto=format&fit=crop&w=900&q=80',
		description: 'A vivid poster print designed to bring a cinematic night-city mood to your room.'
	},
	{
		id: 'academy-pin-set',
		name: 'Academy Club Enamel Pin Set',
		category: 'accessories',
		label: 'Pin Set',
		price: 5.99,
		oldPrice: 8.99,
		image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=900&q=80',
		description: 'Three polished enamel pins made for jackets, totes, lanyards, and display boards.'
	},
	{
		id: 'mystery-blind-box',
		name: 'Mystery Mascot Blind Box',
		category: 'figures',
		label: 'Blind Box',
		price: 7.49,
		oldPrice: 9.49,
		image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
		description: 'Open a surprise mini mascot and discover a new desk companion for your collection.'
	},
	{
		id: 'artist-sticker-pack',
		name: 'Everyday Heroes Sticker Pack',
		category: 'accessories',
		label: 'Sticker Pack',
		price: 3.49,
		oldPrice: 5.49,
		image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80',
		description: 'A mix of durable glossy stickers for notebooks, water bottles, cases, and scrapbooks.'
	},
	{
		id: 'one-piece-luffy-figure',
		name: 'One Piece Luffy Grand Voyage Figure',
		category: 'figures',
		label: 'One Piece Figure',
		price: 24.99,
		oldPrice: 32.99,
		image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=900&q=80',
		description: 'A bold pirate captain display figure with a dynamic pose for an adventure-themed shelf.'
	},
	{
		id: 'dragon-ball-z-manga-set',
		name: 'Dragon Ball Z Manga Collector Set',
		category: 'manga',
		label: 'Dragon Ball Z Manga',
		price: 18.99,
		oldPrice: 24.99,
		image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?auto=format&fit=crop&w=900&q=80',
		description: 'A collectible manga bundle for fans who enjoy classic battles, rivalries, and heroic journeys.'
	},
	{
		id: 'bleach-swordsman-figure',
		name: 'Bleach Soul Reaper Action Figure',
		category: 'figures',
		label: 'Bleach Figure',
		price: 21.99,
		oldPrice: 29.99,
		image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80',
		description: 'A sharp, collector-focused action figure inspired by supernatural sword-fighting anime.'
	}
];

const cartKey = 'animemerch-cart';

function getCart() {
	try {
		const storedCart = JSON.parse(localStorage.getItem(cartKey));
		if (!storedCart || Array.isArray(storedCart) || typeof storedCart !== 'object') return {};
		return Object.fromEntries(Object.entries(storedCart)
			.filter(([id, quantity]) => getProduct(id) && Number.isFinite(Number(quantity)) && Number(quantity) > 0)
			.map(([id, quantity]) => [id, Math.min(10, Math.floor(Number(quantity)))]));
	} catch (error) {
		return {};
	}
}

function saveCart(cart) {
	localStorage.setItem(cartKey, JSON.stringify(cart));
	updateCartCount();
}

function money(value) {
	return `$${value.toFixed(2)}`;
}

function getProduct(id) {
	return products.find(product => product.id === id);
}

function addToCart(id, quantity = 1) {
	if (!getProduct(id)) return;
	const cart = getCart();
	const requestedQuantity = Math.max(1, Math.floor(Number(quantity) || 1));
	cart[id] = Math.min(10, (cart[id] || 0) + requestedQuantity);
	saveCart(cart);
	showToast(`${getProduct(id).name} added to cart`);
}

function removeFromCart(id) {
	const cart = getCart();
	delete cart[id];
	saveCart(cart);
	renderCart();
	renderCheckoutSummary();
}

function changeCartQuantity(id, quantity) {
	const cart = getCart();
	const nextQuantity = Math.max(1, Math.min(10, Number(quantity) || 1));
	cart[id] = nextQuantity;
	saveCart(cart);
	renderCart();
	renderCheckoutSummary();
}

function updateCartCount() {
	const count = Object.values(getCart()).reduce((total, quantity) => total + quantity, 0);
	document.querySelectorAll('.cart-count').forEach(element => {
		element.textContent = count;
	});
}

function productCard(product) {
	return `<article class="product-card">
		<span class="product-badge">${product.label}</span>
		<div class="product-image-container"><img src="${product.image}" alt="${product.name}"></div>
		<div>
			<div class="product-category">${product.category}</div>
			<h3 class="product-name">${product.name}</h3>
			<div class="product-rating">★★★★★ (5.0)</div>
		</div>
		<div class="product-footer">
			<div class="product-price">${money(product.price)} <del>${money(product.oldPrice)}</del></div>
			<button class="btn btn-primary" type="button" onclick="addToCart('${product.id}')">+ Cart</button>
		</div>
	</article>`;
}

function renderCatalog(filter = 'all') {
	const catalog = document.getElementById('catalog-grid');
	if (!catalog) return;
	const visibleProducts = filter === 'all' ? products : products.filter(product => product.category === filter);
	catalog.innerHTML = visibleProducts.length
		? visibleProducts.map(productCard).join('')
		: '<p class="empty-state">No merchandise found in this category.</p>';
}

function renderCart() {
	const tableBody = document.querySelector('.cart-table tbody');
	if (!tableBody) return;
	const cart = getCart();
	const items = Object.entries(cart).map(([id, quantity]) => ({ product: getProduct(id), quantity })).filter(item => item.product);
	tableBody.innerHTML = items.length ? items.map(({ product, quantity }) => `<tr>
		<td><div class="cart-product"><img src="${product.image}" alt="${product.name}"><strong>${product.name}</strong></div></td>
		<td>${money(product.price)}</td>
		<td><input class="form-control cart-quantity" type="number" min="1" max="10" value="${quantity}" onchange="changeCartQuantity('${product.id}', this.value)"></td>
		<td>${money(product.price * quantity)}</td>
		<td><button class="remove-btn" type="button" onclick="removeFromCart('${product.id}')" aria-label="Remove ${product.name}">Remove</button></td>
	</tr>`).join('') : '<tr><td colspan="5" class="empty-state">Your cart is waiting for its first collectible.</td></tr>';
	const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
	const shipping = subtotal > 0 ? 4.99 : 0;
	const totals = document.querySelector('.cart-totals');
	if (totals) totals.innerHTML = `<p>Subtotal <strong>${money(subtotal)}</strong></p><p>Shipping <strong>${money(shipping)}</strong></p><p class="grand-total">Grand Total <strong>${money(subtotal + shipping)}</strong></p><a class="btn btn-primary" href="checkout.html">Proceed to Checkout</a>`;
}

function renderCheckoutSummary() {
	const summary = document.querySelector('.order-summary-card');
	if (!summary) return;
	const cart = getCart();
	const items = Object.entries(cart).map(([id, quantity]) => ({ product: getProduct(id), quantity })).filter(item => item.product);
	const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
	const shipping = subtotal > 0 ? 4.99 : 0;
	summary.innerHTML = `<h3 class="form-header">Order Summary</h3>${items.length ? items.map(({ product, quantity }) => `<p class="summary-line"><span>${product.name} x ${quantity}</span><strong>${money(product.price * quantity)}</strong></p>`).join('') : '<p class="empty-state">Your cart is empty.</p>'}<hr><p class="summary-line">Subtotal <strong>${money(subtotal)}</strong></p><p class="summary-line">Shipping <strong>${money(shipping)}</strong></p><p class="summary-line grand-total">Total <strong>${money(subtotal + shipping)}</strong></p>`;
}

function showToast(message) {
	const toast = document.createElement('div');
	toast.className = 'toast';
	toast.textContent = message;
	document.body.appendChild(toast);
	setTimeout(() => toast.remove(), 2600);
}

function changeImage(src, thumbnail) {
	const mainImage = document.getElementById('mainImage');
	if (mainImage) mainImage.src = src;
	document.querySelectorAll('.thumbnail').forEach(item => item.classList.remove('active'));
	if (thumbnail) thumbnail.classList.add('active');
}

function updateQty(delta) {
	const input = document.getElementById('qtyInput');
	if (!input) return;
	input.value = Math.max(1, Math.min(10, (Number(input.value) || 1) + delta));
}

function addDetailToCart() {
	const input = document.getElementById('qtyInput');
	addToCart('moonlit-swordsman', Number(input?.value) || 1);
}

function setupCheckout() {
	const form = document.getElementById('checkoutForm');
	if (!form) return;
	form.addEventListener('submit', event => {
		event.preventDefault();
		if (Object.keys(getCart()).length === 0) {
			showToast('Add an item to your cart before checking out.');
			return;
		}
		const fields = [
			['fullName', 'name-error', 'Please enter your full name.'],
			['address', 'address-error', 'Please enter your delivery address.'],
			['city', 'city-error', 'Please enter your city.'],
			['pincode', 'pincode-error', 'Enter a valid 6-digit pincode.'],
			['phone', 'phone-error', 'Enter a valid 10-digit phone number.']
		];
		let valid = true;
		fields.forEach(([id, errorId, message]) => {
			const input = document.getElementById(id);
			const error = document.getElementById(errorId);
			const invalid = !input.value.trim() || (id === 'pincode' && !/^\d{6}$/.test(input.value)) || (id === 'phone' && !/^\d{10}$/.test(input.value));
			error.textContent = invalid ? message : '';
			input.classList.toggle('input-error', invalid);
			valid = valid && !invalid;
		});
		if (!valid) return;
		const banner = document.getElementById('order-success-banner');
		banner.className = 'success-banner';
		banner.textContent = 'Order placed successfully. Your anime collection is on its way!';
		banner.style.display = 'block';
		localStorage.removeItem(cartKey);
		updateCartCount();
		renderCheckoutSummary();
		form.reset();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}

document.addEventListener('DOMContentLoaded', () => {
	updateCartCount();
	renderCatalog();
	renderCart();
	renderCheckoutSummary();
	setupCheckout();

	document.querySelectorAll('.filter-btn').forEach(button => {
		button.addEventListener('click', () => {
			document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
			button.classList.add('active');
			renderCatalog(button.dataset.filter);
		});
	});

	const navToggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('.site-header nav');
	navToggle?.addEventListener('click', () => {
		nav?.classList.toggle('open');
	});
});
