/**
 * ============================================================================
 * SLIQ VEGAS — Main Interactive Scripts
 * Slogan: "Wear The Lifestyle."
 * Location: Dzivaresekwa Extension, Harare, Zimbabwe
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // State
  let currentCategory = "all";
  const selectedSizes = {};
  const selectedColours = {};
  const selectedQuantities = {};

  // Elements
  const productsGrid = document.getElementById("productsGrid");
  const filterPills = document.querySelectorAll(".filter-pill");
  const siteHeader = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  
  // Modal Elements
  const quickViewModal = document.getElementById("quickViewModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalImg = document.getElementById("modalImg");
  const modalBadge = document.getElementById("modalBadge");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalAvailability = document.getElementById("modalAvailability");
  const modalDescription = document.getElementById("modalDescription");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalSizePills = document.getElementById("modalSizePills");
  const modalColourPills = document.getElementById("modalColourPills");
  const modalQtyValue = document.getElementById("modalQtyValue");
  const modalQtyMinus = document.getElementById("modalQtyMinus");
  const modalQtyPlus = document.getElementById("modalQtyPlus");
  const modalOrderBtn = document.getElementById("modalOrderBtn");

  // Contact Form
  const enquiryForm = document.getElementById("enquiryForm");

  // --------------------------------------------------------------------------
  // 1. Render Products
  // --------------------------------------------------------------------------
  function renderProducts(category = "all") {
    if (!productsGrid) return;

    const products = (window.SLIQ_PRODUCTS || []).filter(function (prod) {
      if (category === "all") return true;
      return prod.category === category;
    });

    if (products.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="font-family: var(--font-primary); color: var(--color-text-secondary); margin-bottom: 1rem;">
            No items currently found in this category.
          </p>
          <button class="btn btn-outline btn-sm" onclick="filterByCategory('all')">View All Collections</button>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = products.map(function (prod) {
      // Default selections if not set
      if (!selectedSizes[prod.id]) {
        selectedSizes[prod.id] = (prod.availableSizes && prod.availableSizes[0]) || "Standard";
      }
      if (!selectedColours[prod.id]) {
        selectedColours[prod.id] = (prod.availableColours && prod.availableColours[0]) || "Standard";
      }
      if (!selectedQuantities[prod.id]) {
        selectedQuantities[prod.id] = 1;
      }

      const activeSize = selectedSizes[prod.id];
      const activeColour = selectedColours[prod.id];
      const activeQty = selectedQuantities[prod.id];

      // Sizes HTML
      const sizesHtml = (prod.availableSizes || []).map(function (s) {
        const isSel = s === activeSize ? "is-selected" : "";
        return `<button type="button" class="size-pill ${isSel}" data-prod-id="${prod.id}" data-size="${s}">${s}</button>`;
      }).join("");

      // Colours HTML
      const coloursHtml = (prod.availableColours || []).map(function (c) {
        const isSel = c === activeColour ? "is-selected" : "";
        return `<button type="button" class="colour-pill ${isSel}" data-prod-id="${prod.id}" data-colour="${c}">${c}</button>`;
      }).join("");

      // Badge HTML
      const badgeClass = prod.badge && prod.badge.toLowerCase().includes("pink") ? "badge-pink" : "badge-red";
      const assetBadge = !prod.isRealAsset ? `<span class="badge" title="Official apparel photo being updated">Photo Pending</span>` : "";

      return `
        <article class="product-card" id="card-${prod.id}" data-category="${prod.category}">
          <div class="product-image-box" onclick="openQuickView('${prod.id}')" title="Click for details on ${prod.name}">
            <img src="${prod.image}" alt="${prod.name} streetwear apparel by SLIQ VEGAS" loading="lazy">
            <div class="product-badges">
              <span class="badge ${badgeClass}">${prod.badge || 'Streetwear'}</span>
              ${assetBadge}
            </div>
            <button type="button" class="product-quick-view-btn" aria-label="Quick preview of ${prod.name}">Quick View</button>
          </div>

          <div class="product-content">
            <div class="product-category-row">
              <span class="product-category-label">${prod.categoryLabel}</span>
              <span class="product-gender">${prod.gender}</span>
            </div>

            <h3 class="product-title" onclick="openQuickView('${prod.id}')">${prod.name}</h3>

            <div class="product-pricing-row">
              <span class="product-price">${prod.price}</span>
              <span class="product-stock">${prod.availability}</span>
            </div>

            <!-- Size Selector -->
            <div class="product-selector-group">
              <div class="size-label-row">
                <span>Select Size:</span>
                <span id="label-size-${prod.id}" class="selector-active-label">${activeSize}</span>
              </div>
              <div class="size-pills">
                ${sizesHtml}
              </div>
            </div>

            <!-- Colour Selector -->
            ${prod.availableColours && prod.availableColours.length > 0 ? `
              <div class="product-selector-group" style="margin-top: 0.65rem;">
                <div class="size-label-row">
                  <span>Colour:</span>
                  <span id="label-colour-${prod.id}" class="selector-active-label">${activeColour}</span>
                </div>
                <div class="colour-pills">
                  ${coloursHtml}
                </div>
              </div>
            ` : ''}

            <!-- Quantity & WhatsApp CTA -->
            <div class="product-action-row">
              <div class="qty-counter">
                <button type="button" class="qty-btn" aria-label="Decrease quantity" onclick="updateQty('${prod.id}', -1)">-</button>
                <span class="qty-value" id="qty-val-${prod.id}">${activeQty}</span>
                <button type="button" class="qty-btn" aria-label="Increase quantity" onclick="updateQty('${prod.id}', 1)">+</button>
              </div>

              <a href="${buildWhatsAppLink(prod.id)}" 
                 id="btn-order-${prod.id}" 
                 target="_blank" 
                 rel="noopener" 
                 class="btn btn-whatsapp product-order-btn"
                 title="Order ${prod.name} on WhatsApp">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.97.58 3.88 1.68 5.53L2 22l4.74-1.74c1.58.98 3.4 1.5 5.3 1.5 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.06c-1.72 0-3.37-.47-4.81-1.35l-.34-.21-2.82 1.03.88-2.73-.23-.37a8.04 8.04 0 01-1.28-4.52c0-4.47 3.64-8.11 8.11-8.11 4.47 0 8.11 3.64 8.11 8.11s-3.64 8.11-8.11 8.11zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.21-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42h-.48c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/></svg>
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Attach size pill click events
    const sizePillButtons = productsGrid.querySelectorAll(".size-pill");
    sizePillButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const prodId = this.getAttribute("data-prod-id");
        const size = this.getAttribute("data-size");
        selectSize(prodId, size);
      });
    });

    // Attach colour pill click events
    const colourPillButtons = productsGrid.querySelectorAll(".colour-pill");
    colourPillButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const prodId = this.getAttribute("data-prod-id");
        const colour = this.getAttribute("data-colour");
        selectColour(prodId, colour);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. Quantity & Selectors
  // --------------------------------------------------------------------------
  window.updateQty = function (prodId, change) {
    const current = selectedQuantities[prodId] || 1;
    let next = current + change;
    if (next < 1) next = 1;
    if (next > 10) next = 10;
    selectedQuantities[prodId] = next;

    const qtyDisplay = document.getElementById(`qty-val-${prodId}`);
    if (qtyDisplay) {
      qtyDisplay.textContent = next;
    }

    updateProductWhatsAppLink(prodId);
  };

  function selectSize(prodId, size) {
    selectedSizes[prodId] = size;
    const card = document.getElementById(`card-${prodId}`);
    if (card) {
      const pills = card.querySelectorAll(".size-pill");
      pills.forEach(function (p) {
        if (p.getAttribute("data-size") === size) {
          p.classList.add("is-selected");
        } else {
          p.classList.remove("is-selected");
        }
      });
      const label = document.getElementById(`label-size-${prodId}`);
      if (label) label.textContent = size;
    }
    updateProductWhatsAppLink(prodId);
  }

  function selectColour(prodId, colour) {
    selectedColours[prodId] = colour;
    const card = document.getElementById(`card-${prodId}`);
    if (card) {
      const pills = card.querySelectorAll(".colour-pill");
      pills.forEach(function (p) {
        if (p.getAttribute("data-colour") === colour) {
          p.classList.add("is-selected");
        } else {
          p.classList.remove("is-selected");
        }
      });
      const label = document.getElementById(`label-colour-${prodId}`);
      if (label) label.textContent = colour;
    }
    updateProductWhatsAppLink(prodId);
  }

  function buildWhatsAppLink(prodId) {
    const prod = (window.SLIQ_PRODUCTS || []).find(p => p.id === prodId);
    if (!prod) return "https://wa.me/263788715684";
    const size = selectedSizes[prodId] || (prod.availableSizes && prod.availableSizes[0]) || "Standard";
    const colour = selectedColours[prodId] || (prod.availableColours && prod.availableColours[0]) || "Standard";
    const qty = selectedQuantities[prodId] || 1;
    return window.generateWhatsAppOrderUrl(prod, size, colour, qty);
  }

  function updateProductWhatsAppLink(prodId) {
    const btn = document.getElementById(`btn-order-${prodId}`);
    if (btn) {
      btn.href = buildWhatsAppLink(prodId);
    }
  }

  // --------------------------------------------------------------------------
  // 3. Category Filter
  // --------------------------------------------------------------------------
  window.filterByCategory = function (category) {
    currentCategory = category;
    const allPills = document.querySelectorAll(".filter-pill");
    allPills.forEach(function (pill) {
      if (pill.getAttribute("data-category") === category) {
        pill.classList.add("is-active");
      } else {
        pill.classList.remove("is-active");
      }
    });
    renderProducts(category);
  };

  const allCategoryPills = document.querySelectorAll(".filter-pill");
  allCategoryPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      const cat = this.getAttribute("data-category");
      window.filterByCategory(cat);
    });
  });

  // --------------------------------------------------------------------------
  // 4. Quick View Modal
  // --------------------------------------------------------------------------
  let currentModalProd = null;
  let modalActiveSize = null;
  let modalActiveColour = null;
  let modalActiveQty = 1;

  window.openQuickView = function (prodId) {
    const prod = (window.SLIQ_PRODUCTS || []).find(p => p.id === prodId);
    if (!prod || !quickViewModal) return;

    currentModalProd = prod;
    modalActiveSize = selectedSizes[prodId] || (prod.availableSizes && prod.availableSizes[0]) || "Standard";
    modalActiveColour = selectedColours[prodId] || (prod.availableColours && prod.availableColours[0]) || "Standard";
    modalActiveQty = selectedQuantities[prodId] || 1;

    modalImg.src = prod.image;
    modalImg.alt = prod.name;
    modalBadge.textContent = prod.badge || "Signature Drop";
    modalCategory.textContent = `${prod.categoryLabel} • ${prod.gender}`;
    modalTitle.textContent = prod.name;
    modalPrice.textContent = prod.price;
    modalAvailability.textContent = prod.availability;
    modalDescription.textContent = prod.description;

    // Features
    if (modalFeatures && prod.details) {
      modalFeatures.innerHTML = prod.details.map(function (d) {
        return `
          <div class="modal-feature-item">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>${d}</span>
          </div>
        `;
      }).join("");
    }

    // Modal Size Pills
    if (modalSizePills) {
      modalSizePills.innerHTML = (prod.availableSizes || []).map(function (s) {
        const isSel = s === modalActiveSize ? "is-selected" : "";
        return `<button type="button" class="size-pill ${isSel}" onclick="setModalSize('${s}')">${s}</button>`;
      }).join("");
    }

    // Modal Colour Pills
    if (modalColourPills) {
      if (prod.availableColours && prod.availableColours.length > 0) {
        modalColourPills.innerHTML = prod.availableColours.map(function (c) {
          const isSel = c === modalActiveColour ? "is-selected" : "";
          return `<button type="button" class="colour-pill ${isSel}" onclick="setModalColour('${c}')">${c}</button>`;
        }).join("");
        const colourSection = modalColourPills.closest(".modal-colour-section");
        if (colourSection) colourSection.style.display = "block";
      } else {
        modalColourPills.innerHTML = "";
        const colourSection = modalColourPills.closest(".modal-colour-section");
        if (colourSection) colourSection.style.display = "none";
      }
    }

    // Quantity
    if (modalQtyValue) modalQtyValue.textContent = modalActiveQty;

    // Update modal WhatsApp Order Link
    updateModalOrderLink();

    // Open Modal
    quickViewModal.classList.add("is-open");
    quickViewModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (modalCloseBtn) modalCloseBtn.focus();
  };

  window.setModalSize = function (size) {
    modalActiveSize = size;
    if (currentModalProd) {
      selectSize(currentModalProd.id, size);
    }
    if (modalSizePills) {
      const pills = modalSizePills.querySelectorAll(".size-pill");
      pills.forEach(function (p) {
        if (p.textContent.trim() === size) {
          p.classList.add("is-selected");
        } else {
          p.classList.remove("is-selected");
        }
      });
    }
    updateModalOrderLink();
  };

  window.setModalColour = function (colour) {
    modalActiveColour = colour;
    if (currentModalProd) {
      selectColour(currentModalProd.id, colour);
    }
    if (modalColourPills) {
      const pills = modalColourPills.querySelectorAll(".colour-pill");
      pills.forEach(function (p) {
        if (p.textContent.trim() === colour) {
          p.classList.add("is-selected");
        } else {
          p.classList.remove("is-selected");
        }
      });
    }
    updateModalOrderLink();
  };

  window.updateModalQty = function (change) {
    modalActiveQty += change;
    if (modalActiveQty < 1) modalActiveQty = 1;
    if (modalActiveQty > 10) modalActiveQty = 10;
    if (modalQtyValue) modalQtyValue.textContent = modalActiveQty;
    if (currentModalProd) {
      selectedQuantities[currentModalProd.id] = modalActiveQty;
      const cardQty = document.getElementById(`qty-val-${currentModalProd.id}`);
      if (cardQty) cardQty.textContent = modalActiveQty;
      updateProductWhatsAppLink(currentModalProd.id);
    }
    updateModalOrderLink();
  };

  function updateModalOrderLink() {
    if (!currentModalProd || !modalOrderBtn) return;
    modalOrderBtn.href = window.generateWhatsAppOrderUrl(currentModalProd, modalActiveSize, modalActiveColour, modalActiveQty);
  }

  if (modalQtyMinus) modalQtyMinus.addEventListener("click", () => window.updateModalQty(-1));
  if (modalQtyPlus) modalQtyPlus.addEventListener("click", () => window.updateModalQty(1));

  function closeModal() {
    if (!quickViewModal) return;
    quickViewModal.classList.remove("is-open");
    quickViewModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (quickViewModal) {
    quickViewModal.addEventListener("click", function (e) {
      if (e.target === quickViewModal) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && quickViewModal && quickViewModal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 5. Lookbook Lightbox
  // --------------------------------------------------------------------------
  window.openLookbookLightbox = function (imgSrc, title, desc) {
    if (!quickViewModal) return;
    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalBadge.textContent = "HARARE CAMPAIGN";
    modalCategory.textContent = "Official Streetwear Editorial";
    modalTitle.textContent = title;
    modalPrice.textContent = "Featured Style";
    modalAvailability.textContent = "Inquire for Drop Availability";
    modalDescription.textContent = desc || "Official SLIQ VEGAS contemporary streetwear showcase. High-concept urban apparel crafted for confidence and comfort.";
    if (modalFeatures) modalFeatures.innerHTML = "";
    if (modalSizePills) modalSizePills.innerHTML = "";
    if (modalColourPills) modalColourPills.innerHTML = "";
    const colourSection = modalColourPills ? modalColourPills.closest(".modal-colour-section") : null;
    if (colourSection) colourSection.style.display = "none";

    if (modalOrderBtn) {
      modalOrderBtn.href = window.generateWhatsAppGeneralEnquiryUrl(`Campaign Piece: ${title}`);
      modalOrderBtn.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.97.58 3.88 1.68 5.53L2 22l4.74-1.74c1.58.98 3.4 1.5 5.3 1.5 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z"/></svg>
        <span>Enquire on WhatsApp</span>
      `;
    }
    quickViewModal.classList.add("is-open");
    quickViewModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  // --------------------------------------------------------------------------
  // 6. Contact & Custom WhatsApp Enquiry Form
  // --------------------------------------------------------------------------
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = (document.getElementById("custName") || {}).value || "";
      const interest = (document.getElementById("custInterest") || {}).value || "Streetwear Collections";
      const size = (document.getElementById("custSize") || {}).value || "Standard";
      const notes = (document.getElementById("custNotes") || {}).value || "";

      const lines = [
        `*Hello SLIQ VEGAS Team,*`,
        ``,
        `I am reaching out via your website (*Wear The Lifestyle*):`,
        `• *Name:* ${name || "Customer"}`,
        `• *Interest / Piece:* ${interest}`,
        `• *Preferred Size:* ${size}`,
        notes ? `• *Message:* ${notes}` : ``,
        ``,
        `Please confirm availability, pricing, and Harare / nationwide Zimbabwe delivery.`,
        `Thank you!`
      ].filter(Boolean);

      const url = `${window.SLIQ_BRAND.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank", "noopener");
    });
  }

  // --------------------------------------------------------------------------
  // 7. Navigation & Mobile Drawer
  // --------------------------------------------------------------------------
  if (navToggle && mobileNavDrawer) {
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.classList.contains("is-open");
      if (isOpen) {
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        mobileNavDrawer.classList.remove("is-open");
        document.body.style.overflow = "";
      } else {
        navToggle.classList.add("is-open");
        navToggle.setAttribute("aria-expanded", "true");
        mobileNavDrawer.classList.add("is-open");
        document.body.style.overflow = "hidden";
      }
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        mobileNavDrawer.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  // Sticky header on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 40) {
      siteHeader.classList.add("is-scrolled");
    } else {
      siteHeader.classList.remove("is-scrolled");
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 8. Footer Year
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 9. Initial Load
  // --------------------------------------------------------------------------
  renderProducts("all");
});
