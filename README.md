# 🚀 Advanced Sticky Add to Cart (Shopify Dawn Theme)

A production-ready, high-performance Sticky Add to Cart section designed for Shopify OS 2.0 (Dawn and similar themes). This project is built with a focus on Core Web Vitals, seamless UX, and native theme compatibility.

---

## 🧠 Technical Highlights

This section is engineered using Senior-level development patterns:

* **Intersection Observer API**: Replaces heavy `scroll` event listeners. It monitors the main "Add to Cart" button's visibility and toggles the sticky bar only when needed, ensuring zero impact on scrolling performance.
* **Shopify Section Rendering API**: Dynamically fetches variant-specific data (price, title) via AJAX. This provides a fast, app-like experience without full page reloads.
* **Proxy-Click Strategy**: Instead of duplicating complex cart logic, this section "proxies" the click to the theme's native Add to Cart button. This ensures 100% compatibility with Dawn's AJAX Cart Drawer and third-party apps.
* **Vanilla JavaScript**: Zero dependencies. No jQuery or external libraries required, keeping the store's footprint light.

## ✨ Features

* **Real-time Variant Syncing**: Automatically stays in sync with the main product form's selections.
* **Dynamic Price Refresh**: Instantly updates price and titles when a variant is changed.
* **Native Cart Drawer Integration**: Automatically triggers the official Shopify Dawn drawer upon successful addition.
* **Mobile-First Design**: Anchored to the bottom for optimal thumb-reach on mobile devices.
* **Loading Feedback**: Built-in CSS spinner to provide immediate visual confirmation to the user.

---

## 📖 How to Use (Installation)

Follow these steps to integrate the Sticky Add to Cart section into your store:

### 1. Upload Assets
* Download `assets/sticky-atc.js` and upload it to your Shopify **Assets** folder.
* Download `assets/sticky-atc.css` and upload it to your Shopify **Assets** folder.

### 2. Create the Section
* Create a new file in the **Sections** folder named `sticky-atc.liquid`.
* Paste the provided Liquid code from this repository into that file.

### 3. Add to Product Template
1.  Go to **Online Store > Themes > Customize**.
2.  Navigate to the **Product Page** template from the top dropdown menu.
3.  In the sidebar, click **Add Section** and search for **Sticky Add to Cart**.
4.  Once added, you can customize colors, button text, and mobile visibility in the settings.

### 4. Important Requirements
* **Theme**: Optimized for **Shopify Dawn** or any OS 2.0 theme using the standard `cart-drawer`.
* **Cart Settings**: For the best AJAX experience, set your Cart type to **Drawer** (Theme Settings > Cart).

---

## 🛠 Troubleshooting

* **Drawer is not opening?** Ensure your theme's cart drawer is enabled in the settings. If you use a custom drawer, update the `cart-drawer` selector in `sticky-atc.js`.
* **Price not updating?** Make sure your product has variants and that the `variant-selects` component is active on your product page.

---
**Developed with ❤️ by Sergey | Senior Shopify Developer Portfolio**
