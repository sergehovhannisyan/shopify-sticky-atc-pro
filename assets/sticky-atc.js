/**
 * Sticky Add to Cart
 * Strategy: Proxy Clicking the main product form to leverage native theme logic.
 */
class StickyATC {
    constructor() {
      // Select main elements
      this.container = document.querySelector('.sticky-atc');
      this.mainForm = document.querySelector('product-form form');
      this.mainSubmitButton = document.querySelector('product-form [name="add"], .product-form__submit');
      this.stickyVariantInput = document.querySelector('[id^="StickyVariantInput"]');
      this.priceElement = document.querySelector('[id^="StickyPrice"]');
      this.variantTitle = document.querySelector('[id^="StickyVariantTitle"]');
  
      // Early return if essential elements are missing
      if (!this.container || !this.mainSubmitButton) return;
  
      this.init();
    }
  
    init() {
      this.initObserver();
      this.initVariantSync();
      this.initClickProxy();
    }
  
    /**
     * Monitors the visibility of the main Add to Cart button.
     * Shows the Sticky Bar only when the main button scrolls out of view.
     */
    initObserver() {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        // Show sticky bar if main button is above the viewport (scrolled past)
        const isPastTrigger = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        this.container.classList.toggle('is-active', isPastTrigger);
      }, { threshold: 0 });
  
      observer.observe(this.mainSubmitButton);
    }
  
    /**
     * Syncs the variant selection from the main product form to the sticky bar.
     */
    initVariantSync() {
      const mainSelector = document.querySelector('variant-selects, variant-radios');
      if (!mainSelector) return;
  
      mainSelector.addEventListener('change', () => {
        // Small delay to ensure the URL has been updated by the theme's native script
        setTimeout(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const variantId = urlParams.get('variant');
          
          if (variantId && this.stickyVariantInput) {
            this.stickyVariantInput.value = variantId;
            this.refreshStickyData(variantId);
          }
        }, 100);
      });
    }
  
    /**
     * Triggers the native theme Add to Cart logic.
     * Instead of writing a custom AJAX call, we 'click' the hidden main button.
     */
    initClickProxy() {
      const stickyBtn = this.container.querySelector('.sticky-atc__add');
      if (!stickyBtn) return;
  
      stickyBtn.addEventListener('click', (e) => {
        e.preventDefault();
  
        // Ensure the main form's variant ID matches our sticky selection
        const mainIdInput = this.mainForm ? this.mainForm.querySelector('input[name="id"]') : null;
        if (mainIdInput) {
          mainIdInput.value = this.stickyVariantInput.value;
          
          // Visual feedback for the sticky button
          stickyBtn.classList.add('loading');
          
          // Proxy click the main button to trigger Dawn's native AJAX/Drawer logic
          this.mainSubmitButton.click();
          
          // Reset button state after a delay
          setTimeout(() => stickyBtn.classList.remove('loading'), 2000);
        }
      });
    }
  
    /**
     * Fetches updated price and title for the selected variant using Section Rendering API.
     */
    refreshStickyData(variantId) {
      const sectionId = this.container.dataset.sectionId;
      const fetchUrl = `${window.location.pathname}?variant=${variantId}&section_id=${sectionId}`;
  
      fetch(fetchUrl)
        .then(res => res.text())
        .then(responseText => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const newPrice = html.querySelector(`#StickyPrice-${sectionId}`);
          const newTitle = html.querySelector(`#StickyVariantTitle-${sectionId}`);
  
          if (newPrice && this.priceElement) this.priceElement.innerHTML = newPrice.innerHTML;
          if (newTitle && this.variantTitle) this.variantTitle.innerHTML = newTitle.innerHTML;
        })
        .catch(error => console.error('Sticky ATC Refresh Error:', error));
    }
  }
  
  // Initialize the class
  new StickyATC();