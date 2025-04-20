const modal = document.getElementById("myModal");
const btn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");

// Функция для открытия модального окна
function openModal() {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Блокируем прокрутку страницы
}

// Функция для закрытия модального окна
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Восстанавливаем прокрутку
}

// Открываем модальное окно при клике на кнопку
btn.addEventListener("click", openModal);

// Закрываем модальное окно при клике на крестик
closeBtn.addEventListener("click", closeModal);

// Закрываем модальное окно при клике вне его области
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Закрываем модальное окно при нажатии клавиши Escape
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

const burgerButton = document.getElementById("burgerButton");
const navMenu = document.getElementById("navMenu");

burgerButton.addEventListener("click", function () {
  navMenu.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active")
    ? "hidden"
    : "auto";

  const spans = this.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans.forEach((span) => {
      span.style.transform = "";
      span.style.opacity = "";
    });
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".burger-menu") && !e.target.closest(".nav-menu")) {
    navMenu.classList.remove("active");
    document.body.style.overflow = "auto";
    const spans = burgerButton.querySelectorAll("span");
    spans.forEach((span) => {
      span.style.transform = "";
      span.style.opacity = "";
    });
  }
});

const tabLinks = document.querySelectorAll(".tab-link");
const tabPanes = document.querySelectorAll(".tab-pane");

tabLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const tabId = this.getAttribute("data-tab");

    // Remove active classes
    tabLinks.forEach((l) => l.classList.remove("active"));
    tabPanes.forEach((pane) => {
      pane.style.opacity = "0";
      setTimeout(() => {
        pane.classList.remove("active");
      }, 300);
    });

    // Add active classes with animation
    this.classList.add("active");
    const activePane = document.getElementById(tabId);
    setTimeout(() => {
      activePane.classList.add("active");
      setTimeout(() => {
        activePane.style.opacity = "1";
      }, 50);
    }, 300);
  });
});

const filterButtons = document.querySelectorAll(".filter-btn");
const filterItems = document.querySelectorAll(".filter-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const filterValue = this.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    filterItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "scale(0.8)";

      setTimeout(() => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.display = "none";
        }
      }, 300);
    });
  });
});

const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentSlide = 0;
let autoplayInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = "0";
    setTimeout(() => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
        setTimeout(() => {
          slide.style.opacity = "1";
        }, 50);
      }
    }, 300);
  });

  document.querySelector(".slides").style.transform = `translateX(-${
    index * 100
  }%)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

prevBtn.addEventListener("click", () => {
  prevSlide();
  stopAutoplay();
  startAutoplay();
});

nextBtn.addEventListener("click", () => {
  nextSlide();
  stopAutoplay();
  startAutoplay();
});

// Start autoplay
startAutoplay();

// Pause autoplay when hovering over slider
document.querySelector(".slider").addEventListener("mouseenter", stopAutoplay);
document.querySelector(".slider").addEventListener("mouseleave", startAutoplay);

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", function () {
    const item = this.parentNode;
    const content = this.nextElementSibling;
    const isActive = item.classList.contains("active");

    // Close all accordion items with animation
    document.querySelectorAll(".accordion-item").forEach((el) => {
      if (el !== item) {
        el.classList.remove("active");
        el.querySelector(".accordion-content").style.maxHeight = "0";
      }
    });

    // Toggle current item with animation
    if (!isActive) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      item.classList.remove("active");
      content.style.maxHeight = "0";
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Cart functionality
const cart = {
  items: [],
  total: 0,

  addItem(name, price, size) {
    const existingItem = this.items.find(
      (item) => item.name === name && item.size === size
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({
        name,
        price: parseFloat(price),
        size,
        quantity: 1,
      });
    }

    this.updateTotal();
    this.render();
  },

  removeItem(index) {
    this.items.splice(index, 1);
    this.updateTotal();
    this.render();
  },

  updateQuantity(index, delta) {
    const item = this.items[index];
    item.quantity += delta;

    if (item.quantity <= 0) {
      this.removeItem(index);
    } else {
      this.updateTotal();
      this.render();
    }
  },

  updateTotal() {
    this.total = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  render() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (this.items.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
      cartItems.innerHTML = this.items
        .map(
          (item, index) => `
          <div class="cart-item">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <p>${item.size} - $${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
              <div class="quantity-control">
                <button class="quantity-btn" onclick="cart.updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="cart.updateQuantity(${index}, 1)">+</button>
              </div>
              <button class="remove-item" onclick="cart.removeItem(${index})">&times;</button>
            </div>
          </div>
        `
        )
        .join("");
    }

    cartTotal.textContent = `$${this.total.toFixed(2)}`;
  },
};

// Add to cart button click handlers
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".product-card");
    const name = card.querySelector("h3").textContent;
    const price = card.querySelector(".price").textContent.replace("$", "");
    const size = card.querySelector(".size-select").value;

    cart.addItem(name, price, size);

    // Show success message
    const originalText = this.textContent;
    this.textContent = "Added to Cart!";
    this.disabled = true;

    setTimeout(() => {
      this.textContent = originalText;
      this.disabled = false;
    }, 2000);
  });
});

// Checkout button click handler
document.querySelector(".checkout-btn").addEventListener("click", function () {
  if (cart.items.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Here you would typically redirect to a checkout page or show a checkout modal
  alert("Proceeding to checkout...");
});
