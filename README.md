# Full Stack Development (BTCS303P) — Mini E-Commerce Project

**Department of Computer Science & Engineering — COER University**  
**Project Title:** OTAKUVERSE — Cyberpunk Anime & Gaming Storefront  
**Repository:** [https://github.com/cu24250059-pixel/Full_stack_BTCS303P](https://github.com/cu24250059-pixel/Full_stack_BTCS303P)

---

## 📅 Implementation Timeline & Lab Sheet Log

### 🔹 Lab Sheet 1: Building the Storefront (HTML5 & CSS3)
**Completion Date:** August 19, 2026  
**Covers:** Project Phase 1 & Phase 2 Specifications

- **HTML5 Page Structure:** Created 5 structured web pages:
  - `index.html` — Storefront homepage, hero section, featured collectibles, store features banner.
  - `products.html` — Full catalog view with category filter bar.
  - `product-detail.html` — Detailed product view with thumbnail image gallery switcher & specifications.
  - `cart.html` — Shopping cart summary table.
  - `checkout.html` — Shipping address input form and payment method selection.
- **CSS3 Styling & Layout (`style.css`):**
  - Configured CSS Custom Properties (`:root`) for cyberpunk theme palette (Sakura Pink `#ff2a74`, Cyber Cyan `#00f0ff`, Spirit Violet `#9d4edd`, Glassmorphism dark background).
  - Responsive header & navigation using **Flexbox**.
  - Product card grid layout using **CSS Grid** (`grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))`).
  - Mobile responsiveness with `@media` breakpoints for devices, tablets, and desktops.
- **Canvas Particle Background (`particles.js`):**
  - Interactive HTML5 2D Canvas animation featuring floating sakura petals and neon energy particles.

---

### 🔹 Lab Sheet 2: Making It Interactive (Vanilla JavaScript)
**Completion Date:** August 26, 2026  
**Covers:** Project Phase 3 Specifications (Tasks 1 – 8)  
**Main Script File:** [`script.js`](./script.js) (Linked across all HTML pages)

- **Task 1 — Catalog Data Array:** Created `const products = [...]` containing 19 store items (`id`, `name`, `price`, `image`, `category`, `priceINR`) featuring Genshin Impact, Honkai: Star Rail, Lord of the Mysteries webnovels, action figures, keychains, and posters.
- **Task 2 — Dynamic Product Rendering:** Created `renderProducts()` to dynamically build product card elements into `#catalog-grid` using DOM methods (`querySelector`, `innerHTML`) and template literals (`map()`).
- **Task 3 — Add to Cart Handler:** Implemented `addToCart(productId)` to store item objects in a cart array and persist to browser storage using `localStorage.setItem('cart', JSON.stringify(cart))`.
- **Task 4 — Dynamic Cart Rendering:** Created `renderCart()` on `cart.html` to read cart data from `localStorage.getItem('cart')` (`JSON.parse()`) and dynamically render table rows with working quantity inputs and 'Remove' buttons (`removeFromCart()`).
- **Task 5 — Explicit `calculateTotal()`:** Implemented `calculateTotal()` using array method `reduce()` to recalculate item subtotals, express shipping, and grand total whenever quantity changes or items are removed.
- **Task 6 — Checkout Form Validation:** Implemented `validateCheckoutForm()` on `checkout.html`:
  - **Full Name:** Required (Must not be empty) -> Inline Error: *"❌ Name must not be empty."*
  - **Delivery Address:** Required (Must not be empty) -> Inline Error: *"❌ Address must not be empty."*
  - **Pincode:** Exactly 6 digits (`/^\d{6}$/`) -> Inline Error: *"❌ Pincode must be exactly 6 digits."*
  - **Phone Number:** Exactly 10 digits (`/^\d{10}$/`) -> Inline Error: *"❌ Phone number must be exactly 10 digits."*
  - **Inline Error Feedback:** Errors are displayed directly under input fields in red without calling `alert()`.
- **Task 7 — Order Confirmation & Storage Reset:** On successful validation, displays an inline confirmation banner (`🎉 Order Placed Successfully!`) with an order tracking ID, and clears cart data from `localStorage`.
- **Task 8 — Navbar Cart Badge Sync:** Implemented `updateCartBadge()` executing universally on all pages to display total item quantity in the navbar `.cart-count` badge read from `localStorage`.

---

## 📂 Project Directory Structure

```
Full_stack_BTCS303P/
├── README.md               <-- Documentation & Lab Timeline Log
├── index.html              <-- Homepage & Hero Banner
├── products.html           <-- Catalog Page (Dynamic JS Rendering)
├── product-detail.html     <-- Product View & Gallery Switcher
├── cart.html               <-- Shopping Cart Table & calculateTotal()
├── checkout.html           <-- Form Validation & Order Confirmation
├── style.css               <-- CSS Variables, Glassmorphism & Responsive Design
├── script.js               <-- Central Vanilla JS Script (Lab Sheet 2 Tasks 1-8)
└── particles.js            <-- HTML5 Canvas 2D Particle Background
```

---

## 🚀 How to Run locally

1. Clone this repository:
   ```bash
   git clone https://github.com/cu24250059-pixel/Full_stack_BTCS303P.git
   ```
2. Open `index.html` or `products.html` in any modern web browser.