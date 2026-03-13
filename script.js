import ALL_POSTERS from "./posters.js";
import { getCurrency, setCurrency, convert } from "./currency.js";

let cart = [];
let shuffledPosters = null;
let visibleCount = 24;

const DOM = {
    gallery: document.getElementById("gallery"),
    grid: document.getElementById("grid"),
    loadMoreBtn: document.getElementById("load-more"),
    searchInput: document.getElementById("search-input"),
    searchResults: document.getElementById("search-results"),
    currencySwitcher: document.getElementById("currency-switcher"),
    cartModal: document.getElementById("cart-modal"),
    paymentButtons: document.getElementById("payment-buttons"),
    cartItems: document.getElementById("cart-items"),
    cartTotal: document.getElementById("cart-total"),
    
    mainContainer: document.body,
    cartCount: document.getElementById("cart-count"),
};

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}

function escapeHtml(str = "") {
    return String(str).replace(/[&<>"']/g, (s) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    }[s]));
}

function getShuffledPosters() {
  if (!shuffledPosters) {
    shuffledPosters = [...ALL_POSTERS].sort(() => Math.random() - 0.5);
  }
  return shuffledPosters;
}


function saveCart() {
    localStorage.setItem("posterium_cart", JSON.stringify(cart));
    window.cart = cart;
}

function loadCart() {
  const savedCart = localStorage.getItem("posterium_cart");
  cart = savedCart ? JSON.parse(savedCart) : [];
  window.cart = cart;
  updateCartCount();
}
function updateCartCount() {
  if (!DOM.cartCount) return;
  const count = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  DOM.cartCount.textContent = String(count);
}


function addToCart(poster) {
  const existingItem = cart.find((item) => item.id === poster.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: poster.id,
      title: poster.title,
      image: poster.image,
      price_eur: poster.price_eur,
      price: poster.price_eur,
      quantity: 1,
    });
  }

  saveCart();
  updateCartCount();

}



function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
     updateCartCount();
    renderCart();
}

function renderCart() {
    if (!DOM.cartItems || !DOM.cartTotal) return;
    let totalEur = 0;
    DOM.cartItems.innerHTML = cart.map((item, index) => {
        const itemTotalEur = item.price_eur * item.quantity;
        totalEur += itemTotalEur;
        return `
            <div class="flex items-center justify-between bg-gray-800 p-3 rounded-md shadow text-white">
                <div class="flex items-center space-x-3">
                    <img src="${item.image}" alt="${escapeHtml(item.title)}" class="w-12 h-12 object-cover rounded">
                    <div>
                        <p class="font-semibold">${escapeHtml(item.title)}</p>
                        <p class="text-gray-400">${convert(item.price_eur)} × ${item.quantity} = ${convert(itemTotalEur)}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join("");
    DOM.cartTotal.textContent = `Total: ${convert(totalEur)}`;
    if (DOM.paymentButtons) {
        renderStripeButton(totalEur);
    }
}

function updateCurrencySwitcherUI() {
    const currentCurrency = getCurrency();
    DOM.currencySwitcher?.querySelectorAll("span").forEach((el) => {
        el.classList.toggle("bg-gray-600", el.dataset.cur === currentCurrency);
    });
}

function updateAllPrices() {
    document.querySelectorAll("[data-price-eur]").forEach((el) => {
        const priceEur = parseFloat(el.dataset.priceEur);
        el.textContent = convert(priceEur);
    });
}

function rerenderCurrentView() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("poster");
    if (slug) {
        renderProductPage(slug);
    } else {
        renderCatalogPage();
    }
    if (!DOM.cartModal.classList.contains("hidden")) {
        renderCart();
    }
}

function renderPosterCards(posters) {
  if (!DOM.grid) return;

  DOM.grid.innerHTML = posters.map((poster) => {
    const slug = slugify(poster.title);

    const isWide = !!poster.wide;
    const cardSpan = isWide ? "lg:col-span-2" : "";
    const ratio = isWide ? "pt-[75%]" : "pt-[150%]";

    const imgFit = isWide ? "object-contain p-3" : "object-cover";

    return `
      <a href="/?poster=${slug}"
         class="poster-card block bg-gray-800 rounded-lg shadow-md overflow-hidden ${cardSpan}">

        <div class="relative w-full ${ratio} overflow-hidden bg-gray-900">
          <img
            src="${poster.image}"
            class="absolute inset-0 w-full h-full ${imgFit} transition-transform duration-300 hover:scale-105"
            alt="${escapeHtml(poster.title)}"
            loading="lazy"
          >

          <div class="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-yellow-300 text-gray-900 px-3 py-1 rounded-lg font-bold shadow-lg border border-yellow-200 text-sm md:text-base" data-price-eur="${poster.price_eur}">
            ${convert(poster.price_eur)}
          </div>
        </div>

        <!-- ✅ НИЗ як на прикладі: title + size + artist -->
        <div class="p-4 text-center">
          <h3 class="text-white font-semibold text-base md:text-lg leading-tight mb-2 line-clamp-2">
            ${escapeHtml(poster.title)}
          </h3>

          ${poster.size ? `
            <p class="text-gray-400 text-xs md:text-sm mb-1">
              ${escapeHtml(poster.size)}
            </p>
          ` : ""}

          <p class="text-gray-500 text-xs md:text-sm">
            ${escapeHtml(poster.artist || "Unknown")}
          </p>
        </div>

      </a>
    `;
  }).join("");
}


function renderCatalogPage() {
    document.getElementById("product-page")?.remove();
    if (DOM.gallery) DOM.gallery.classList.remove("hidden");

    const posters = getShuffledPosters().slice(0, visibleCount);
    renderPosterCards(posters);

    if (DOM.loadMoreBtn) {
        DOM.loadMoreBtn.style.display = visibleCount >= ALL_POSTERS.length ? "none" : "block";
    }
}

function renderProductPage(slug) {
  const poster = ALL_POSTERS.find((p) => slugify(p.title) === slug);
  if (!poster) {
    history.replaceState({}, "", "/");
    showHomeSections();
    return;
  }
  window.scrollTo({ top: 0, behavior: "instant" });
  
  hideHomeSections();
  document.getElementById("product-page")?.remove();

  const page = document.createElement("section");
  page.id = "product-page";
  page.className = "max-w-6xl mx-auto p-6";

  const images = (poster.images && poster.images.length) ? poster.images : [poster.image];
  const isWide = !!poster.wide;
  const imgMaxH = isWide ? "max-h-[520px]" : "max-h-[680px]";
  page.innerHTML = `
    <div class="grid md:grid-cols-2 gap-10">
      <!-- LEFT: slider -->
      <div>
        <div class="slider-viewport relative overflow-hidden rounded-lg shadow-lg bg-gray-900">

          <div class="slider flex transition-transform duration-300" style="transform: translateX(0);">
            ${images.map(img => `
  <div class="min-w-full flex items-center justify-center">
    <img
      src="${img}"
      class="zoomable w-full ${imgMaxH} object-contain select-none cursor-zoom-in transition-transform duration-200"
      alt="${escapeHtml(poster.title)}"
      draggable="false"
    >
  </div>
`).join("")}
          </div>

          ${images.length > 1 ? `
            <button class="prev absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800/80 text-white px-3 py-2 rounded-lg">&lt;</button>
            <button class="next absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800/80 text-white px-3 py-2 rounded-lg">&gt;</button>
          ` : ``}
        </div>

        
        ${images.length > 1 ? `
          <div class="mt-3 flex gap-2 overflow-auto pb-1">
            ${images.map((img, i) => `
              <button class="thumb border border-gray-700 rounded-md overflow-hidden w-16 h-16 flex-shrink-0" data-idx="${i}">
                <img src="${img}" class="w-full h-full object-cover" alt="">
              </button>
            `).join("")}
          </div>
        ` : ``}
      </div>

  
      <div class="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
        <h1 class="text-3xl font-bold text-white mb-2">${escapeHtml(poster.title)}</h1>
        <p class="text-gray-400 mb-1">${escapeHtml(poster.artist || "Unknown")}</p>
        <p class="text-gray-500 mb-4">${escapeHtml(poster.size || "N/A")}</p>

        <div class="flex items-center justify-between gap-4 mb-4">
          <div class="text-yellow-400 text-3xl font-bold" data-price-eur="${poster.price_eur}">
            ${convert(poster.price_eur)}
          </div>

          <button id="buy-now-btn"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg whitespace-nowrap">
            Buy it now
          </button>
          
        </div>
<p class="mt-3 text-[18px] font-medium text-emerald-400 italic text-center">
  We indicate the minimum shipping cost so that your customs duties are minimal
</p>

        
        <div class="text-[15px] text-gray-200 space-y-3 border-t border-gray-700 pt-5">

          <div class="flex justify-between gap-4">
            <span class="text-gray-400">Shipping:</span>
            <span>Free worldwide shipping</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="text-gray-400">Located in:</span>
            <span>Ukraine</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="text-gray-400">Delivery:</span>
            <span>Estimated 7–20 business days</span>
          </div>

          <div class="flex justify-between gap-4">
            <span class="text-gray-400">Returns:</span>
            <span>14 days returns (buyer pays shipping)</span>
          </div>

          <div class="pt-2 text-gray-400">
            Payments: Visa / Mastercard / Stripe
          </div>
        </div>
      </div>
    </div>
   
    <div class="mt-10">

  <div class="flex items-center gap-3 mb-8">
    <span class="h-px flex-1 bg-gray-700/60"></span>
    <h2 class="text-3xl md:text-3xl font-display font-semibold uppercase tracking-wide text-white">
      Similar posters
    </h2>
    <span class="h-px flex-1 bg-gray-700/60"></span>
  </div>

  <div id="similar-grid" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>

</div>


    <div class="mt-10 bg-gray-800/40 border border-gray-700 rounded-xl p-6">

  <div class="flex items-center gap-3 mb-8">
    <span class="h-px flex-1 bg-gray-700/60"></span>
    <h2 class="text-3xl md:text-3xl font-display font-semibold uppercase tracking-wide text-white">
      Description
    </h2>
    <span class="h-px flex-1 bg-gray-700/60"></span>
  </div>

  <p class="text-gray-300 leading-relaxed">
    ${poster.description 
      ? escapeHtml(poster.description).replace(/\n/g, "<br>")
      : "No description available."}
  </p>

</div>

  `;


  const footer = document.querySelector("footer");
  if (footer) footer.before(page);
  else DOM.mainContainer.appendChild(page);

 
  if (images.length > 1) {
    const slider = page.querySelector(".slider");
    const prev = page.querySelector(".prev");
    const next = page.querySelector(".next");
    const thumbs = page.querySelectorAll(".thumb");

    let currentIndex = 0;

   function goTo(idx) {
  currentIndex = idx;
  resetAllZoom(page); 
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}


    prev.addEventListener("click", () => goTo(currentIndex > 0 ? currentIndex - 1 : images.length - 1));
    next.addEventListener("click", () => goTo(currentIndex < images.length - 1 ? currentIndex + 1 : 0));
    thumbs.forEach(btn => btn.addEventListener("click", () => goTo(parseInt(btn.dataset.idx, 10))));
  }

  
page.querySelector("#buy-now-btn").addEventListener("click", () => {
  addToCart(poster);   
  updateCartCount();    
  
});




 
  renderSimilarPosters(poster);
  updateAllPrices();

}

function renderSimilarPosters(currentPoster) {
  const box = document.getElementById("similar-grid");
  if (!box) return;

  const currentSlug = slugify(currentPoster.title);
  const artist = (currentPoster.artist || "").toLowerCase();

  
  let candidates = ALL_POSTERS
    .filter(p => slugify(p.title) !== currentSlug)
    .filter(p => artist ? (p.artist || "").toLowerCase() === artist : true);

  
  if (candidates.length < 4) {
    const extra = ALL_POSTERS
      .filter(p => slugify(p.title) !== currentSlug)
      .filter(p => !candidates.includes(p));
    candidates = candidates.concat(extra);
  }

  
  const shuffled = [...candidates];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const list = shuffled.slice(0, 4);

  box.innerHTML = list.map(p => {
    const slug = slugify(p.title);

    return `
      <a href="/?poster=${slug}" class="poster-card block bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="relative w-full pt-[150%] overflow-hidden bg-gray-900">
          <img
            src="${p.image}"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            alt="${escapeHtml(p.title)}"
            loading="lazy"
          >

          <div class="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-yellow-300 text-gray-900 px-3 py-1 rounded-lg font-bold shadow-lg border border-yellow-200 text-sm md:text-base"
               data-price-eur="${p.price_eur}">
            ${convert(p.price_eur)}
          </div>
        </div>

        
        <div class="p-4 text-center">
          <h3 class="text-white font-semibold text-base md:text-lg leading-tight mb-2 line-clamp-2">
            ${escapeHtml(p.title)}
          </h3>

          ${p.size ? `
            <p class="text-gray-400 text-xs md:text-sm mb-1">
              ${escapeHtml(p.size)}
            </p>
          ` : ""}

          <p class="text-gray-500 text-xs md:text-sm">
            ${escapeHtml(p.artist || "Unknown")}
          </p>
        </div>
      </a>
    `;
  }).join("");
}


function setupLoadMore() {
    DOM.loadMoreBtn?.addEventListener("click", () => {
        visibleCount += 20;
        renderCatalogPage();
    });
}

function setupSearch() {
    const input = document.getElementById("search-input");
    const resultsContainer = document.getElementById("search-results");
    if (!input || !resultsContainer) return;

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        resultsContainer.innerHTML = "";
        if (!query) {
            resultsContainer.classList.add("hidden");
            return;
        }

        const matches = ALL_POSTERS.filter(
            poster =>
                poster.title.toLowerCase().includes(query) ||
                (poster.artist && poster.artist.toLowerCase().includes(query))
        ).slice(0, 10);

        if (matches.length > 0) {
            matches.forEach(poster => {
                const item = document.createElement("div");
                item.className = "flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer transition";
                item.innerHTML = `
                    <img src="${poster.image}" alt="${escapeHtml(poster.title)}" class="w-10 h-14 object-cover rounded border border-gray-600">
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-sm text-white truncate">${poster.title}</p>
                        <p class="text-[15px] text-gray-300 mb-5 font-medium">${poster.artist || "Unknown"}</p>
                    </div>
                    <span class="text-yellow-400 font-semibold text-sm whitespace-nowrap">${convert(poster.price_eur)}</span>
                `;
                item.addEventListener("click", () => {
                history.pushState({}, "", `/?poster=${slugify(poster.title)}`);
                rerenderCurrentView();
                input.value = "";
                resultsContainer.classList.add("hidden");
                });

                resultsContainer.appendChild(item);
            });
            resultsContainer.classList.remove("hidden");
        } else {
            resultsContainer.innerHTML = `<div class="p-2 text-gray-400 text-sm">No results found</div>`;
            resultsContainer.classList.remove("hidden");
        }
    });

    document.addEventListener("click", (e) => {
        if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.add("hidden");
        }
    });
}


function setupCurrencySwitcher() {
    DOM.currencySwitcher?.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN" && e.target.dataset.cur) {
            setCurrency(e.target.dataset.cur);
            updateCurrencySwitcherUI();
            updateAllPrices();
            if (!DOM.cartModal.classList.contains("hidden")) {
                renderCart();
            }
        }
    });
}

let stripe;

async function initStripe() {
  try {
    const res = await fetch("/api/get-publishable-key");
    const data = await res.json();
    if (!res.ok || !data.key) return console.error("No Stripe key", data);
    stripe = Stripe(data.key);
  } catch (err) {
    console.error("Stripe init error", err);
  }
}


function setupShippingForm() {
  const shippingForm = document.getElementById("shipping-form");
  if (!shippingForm) return;

  shippingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!window.cart || !window.cart.length) {
      alert("Your cart is empty — add at least one item.");
      return;
    }

    const formData = new FormData(shippingForm);

    const formspreeResponse = await fetch("https://formspree.io/f/xqadrzkk", {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (!formspreeResponse.ok) {
      alert("Error sending shipping form.");
      return;
    }

    try {
      const createSessionResponse = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: window.cart,
          origin: window.location.origin,
          shipping: Object.fromEntries(formData)
        })
      });

      const data = await createSessionResponse.json();

      if (!data.sessionId) {
        alert("Stripe session error");
        return;
      }

      if (!stripe) await initStripe();
      if (!stripe) return alert("Stripe failed to load.");

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Payment redirect failed. Please try again.");
    }
  });
}


function renderStripeButton(total) {
    if (!DOM.paymentButtons) return;
    DOM.paymentButtons.innerHTML = "";

    const btn = document.createElement("button");
    btn.className = "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-3";
    btn.innerHTML = `
        <div class="flex items-center justify-center space-x-2">
            <i class="fas fa-credit-card text-xl"></i>
            <span>Proceed to Payment — ${convert(total)}</span>
        </div>
    `;
    btn.addEventListener("click", () => {
  closeModal(DOM.cartModal);
  openModal(document.getElementById("shipping-modal"));
});

    DOM.paymentButtons.appendChild(btn);
}

function setupCartModal() {
    DOM.cartModal?.addEventListener("click", (e) => {
        if (e.target === DOM.cartModal || e.target.dataset.close) {
            DOM.cartModal.classList.add("hidden");
            DOM.cartModal.classList.remove("flex");
        }
    }); 
}
function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove("hidden");
  modalEl.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add("hidden");
  modalEl.classList.remove("flex");
  document.body.style.overflow = "";
}
function setupGlobalModalClose() {
  document.addEventListener("click", (e) => {
    const closeEl = e.target.closest("[data-close]");
    if (!closeEl) return;

    const modal = closeEl.closest("#poster-modal, #cart-modal, #shipping-modal");
    if (!modal) return;

    closeModal(modal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(document.getElementById("cart-modal"));
      closeModal(document.getElementById("shipping-modal"));
      closeModal(document.getElementById("poster-modal"));
    }
  });
}


function initialize() {
  loadCart();
  initStripe();

  setupClientSideRouting();
  setupModalCloseHandlers(); 
setupGlobalModalClose();
  rerenderCurrentView();
  setupLoadMore();
  setupSearch();
  setupCurrencySwitcher();
  setupCartModal();
  updateCurrencySwitcherUI();
  setupShippingForm();
  document.getElementById("cart-icon")?.addEventListener("click", () => {
  renderCart();
  openModal(DOM.cartModal);
});

}


function hideHomeSections() {
  DOM.gallery?.classList.add("hidden");
  document.getElementById("home-hero")?.classList.add("hidden");
}

function showHomeSections() {
  DOM.gallery?.classList.remove("hidden");
  document.getElementById("home-hero")?.classList.remove("hidden");
  document.getElementById("product-page")?.remove();
}
function setupClientSideRouting() {
  
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="/?poster="]');
    if (!a) return;

    e.preventDefault();
    const url = new URL(a.getAttribute("href"), window.location.origin);

    history.pushState({}, "", url.pathname + url.search);
    rerenderCurrentView();
  });

 
  document.querySelectorAll('a[href="#gallery"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();

      history.pushState({}, "", "/#gallery");
      showHomeSections();
      renderCatalogPage();

      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  window.addEventListener("popstate", () => {
    rerenderCurrentView();
  });
}
function openShippingModal() {
  const shippingModal = document.getElementById("shipping-modal");
  if (!shippingModal) return;
  shippingModal.classList.remove("hidden");
  shippingModal.classList.add("flex");
  document.body.style.overflow = "hidden";
}


function setupModalCloseHandlers() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("#cart-modal, #shipping-modal") || e.target.closest("[data-close]")) {
      const modal = e.target.closest("#cart-modal, #shipping-modal") || document.querySelector("#shipping-modal.flex, #cart-modal.flex");
      closeModal(modal);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(document.getElementById("shipping-modal"));
      closeModal(document.getElementById("cart-modal"));
    }
  });
}

function lockScroll() { document.body.style.overflow = "hidden"; }
function unlockScroll() { document.body.style.overflow = ""; }
function resetAllZoom(root = document) {
  root.querySelectorAll("img.zoomable.zoomed").forEach((img) => {
    img.classList.remove("zoomed");
    img.style.transform = "";
    img.style.transformOrigin = "";
    img.classList.add("cursor-zoom-in");
    img.classList.remove("cursor-zoom-out");
  });
}
let activeZoomImg = null;

document.addEventListener("mousemove", (e) => {
  const img = e.target.closest("img.zoomable");
  if (!img) {
    if (activeZoomImg) {
      activeZoomImg.classList.remove("zoomed");
      activeZoomImg.style.transformOrigin = "";
      activeZoomImg.classList.add("cursor-zoom-in");
      activeZoomImg.classList.remove("cursor-zoom-out");
      const vp = activeZoomImg.closest(".slider-viewport");
      vp?.classList.remove("zoom-open");
      activeZoomImg = null;
    }
    return;
  }

  if (activeZoomImg && activeZoomImg !== img) {
    activeZoomImg.classList.remove("zoomed");
    activeZoomImg.style.transformOrigin = "";
    activeZoomImg.classList.add("cursor-zoom-in");
    activeZoomImg.classList.remove("cursor-zoom-out");
    const vpOld = activeZoomImg.closest(".slider-viewport");
    vpOld?.classList.remove("zoom-open");
  }

  activeZoomImg = img;

  if (!img.classList.contains("zoomed")) img.classList.add("zoomed");

  const rect = img.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const originX = (offsetX / rect.width) * 100;
  const originY = (offsetY / rect.height) * 100;

  img.style.transformOrigin = `${originX}% ${originY}%`;

  img.classList.remove("cursor-zoom-in");
  img.classList.add("cursor-zoom-out");

  const viewport = img.closest(".slider-viewport");
  viewport?.classList.add("zoom-open");
});

document.addEventListener("mouseleave", () => {
  if (!activeZoomImg) return;
  activeZoomImg.classList.remove("zoomed");
  activeZoomImg.style.transformOrigin = "";
  activeZoomImg.classList.add("cursor-zoom-in");
  activeZoomImg.classList.remove("cursor-zoom-out");
  const vp = activeZoomImg.closest(".slider-viewport");
  vp?.classList.remove("zoom-open");
  activeZoomImg = null;
});



document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") resetAllZoom(document);
});


document.addEventListener("DOMContentLoaded", initialize);
window.removeFromCart = removeFromCart;