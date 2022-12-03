const menuIcon = document.querySelector(".menu-icon i");
const menuCloseIcon = document.querySelector(".menu-close-icon i");
const menuList = document.querySelector(".menu-list");

menuIcon.addEventListener("click", () => {
  menuIcon.style.display = "none";
  menuCloseIcon.style.display = "block";
  menuList.style.cssText = "visibility: visible; opacity: 1;";
  cart.style.cssText = "visibility: hidden; opacity: 0; top: -100%;";
});

menuCloseIcon.addEventListener("click", () => {
  menuCloseIcon.style.display = "none";
  menuIcon.style.display = "block";
  menuList.style.cssText = "visibility: hidden; opacity: 0;";
});

const cart = document.querySelector(".cart");
const cartIcon = document.querySelector(".cart-icon");

cartIcon.addEventListener("click", () => {
  cart.style.cssText = "visibility: visible; opacity: 1; top: 100%;";
});

const menuCart = document.querySelector(".menu-cart");
const cartClose = document.querySelector(".close");

cartClose.addEventListener("click", () => {
  cart.style.cssText = "visibility: hidden; opacity: 0; top: -100%;";
});

menuCart.addEventListener("click", () => {
  cart.style.cssText = "visibility: visible; opacity: 1; top: 100%;";
  menuCloseIcon.style.display = "none";
  menuIcon.style.display = "block";
  menuList.style.cssText = "visibility: hidden; opacity: 0;";
});

const removeIcons = document.querySelectorAll(".remove-icon i");

for (let i = 0; i < removeIcons.length; i++) {
  let button = removeIcons[i];
  button.addEventListener("click", removeFromCart);
};

function removeFromCart(event) {
  let button = event.target;
  button.parentElement.parentElement.remove();
  updateCartTotal();
};

const addIcons = document.querySelectorAll(".products-cart-icon i");
for (let i = 0; i < addIcons.length; i++) {
  let button = addIcons[i];
  button.addEventListener("click", addToCartClicked);
};

function addToCartClicked(event) {
  const button = event.target;
  const productBox = button.parentElement.parentElement.parentElement;
  const imgSrc = productBox.querySelector("img").src;
  const title = productBox.querySelector("h3").innerText;
  const price = productBox.querySelector("span").innerText;
  addToCart(imgSrc, title, price);
  updateCartTotal();
};

function addToCart(imgSrc, title, price) {
  const cartImgSrc = document.querySelectorAll(".cart-box img");
  const quantityInputs = document.querySelectorAll(".cart-box input");
  for (let i = 0; i < cartImgSrc.length; i++) {
    if (cartImgSrc[i].src === imgSrc ) {
      quantityInputs[i].value++;
      return;
    };
  };
  const newBox = document.createElement("div");
  const cartBoxes = document.querySelector(".cart-boxes");
  newBox.classList.add("cart-box");
  cartBoxes.appendChild(newBox);
  const newBoxContent = `
  <img src="${imgSrc}" alt="">
  <div class="details">
    <h4>${title}</h4>
    <span>${price}</span>
    <input type="number" value="1" min="1">
  </div>
  <div class="remove-icon">
    <i class="fa-solid fa-trash"></i>
  </div>
  `
  newBox.innerHTML = newBoxContent;
  newBox.querySelector(".remove-icon i").addEventListener("click", removeFromCart);
  newBox.querySelector(".cart-box input").addEventListener("change", updateCartTotal);
};

function updateCartTotal() {
  let total = 0;
  const cartBoxes = document.querySelectorAll(".cart-box");
  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const priceElement = cartBox.querySelector("span").innerText.replace("$", "");
    const price = parseFloat(priceElement);
    const quantity = cartBox.querySelector("input").value;
    total = total + (price * quantity);
  };
  document.querySelector(".subtotal-number").innerText = "$" + total;
};