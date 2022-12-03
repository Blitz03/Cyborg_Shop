let menuIcon = document.querySelector(".menu-icon i");
let menuCloseIcon = document.querySelector(".menu-close-icon i");
let menuList = document.querySelector(".menu-list");

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

let cart = document.querySelector(".cart");
let cartIcon = document.querySelector(".cart-icon");

cartIcon.addEventListener("click", () => {
  cart.style.cssText = "visibility: visible; opacity: 1; top: 100%;";
});

let menuCart = document.querySelector(".menu-cart");
let cartClose = document.querySelector(".close");

cartClose.addEventListener("click", () => {
  cart.style.cssText = "visibility: hidden; opacity: 0; top: -100%;";
});

menuCart.addEventListener("click", () => {
  cart.style.cssText = "visibility: visible; opacity: 1; top: 100%;";
  menuCloseIcon.style.display = "none";
  menuIcon.style.display = "block";
  menuList.style.cssText = "visibility: hidden; opacity: 0;";
});

let removeIcons = document.querySelectorAll(".remove-icon i");

for (let i = 0; i < removeIcons.length; i++) {
  let button = removeIcons[i];
  button.addEventListener("click", removeFromCart);
};

function removeFromCart(event) {
  let button = event.target;
  button.parentElement.parentElement.remove();
  updateCartTotal();
};

let quantities = document.querySelectorAll(".cart-box input");
for (let i = 0; i < quantities.length; i++) {
  let input = quantities[i];
  input.addEventListener("change", updateCartTotal);
};

let addIcons = document.querySelectorAll(".products-cart-icon i");
for (let i = 0; i < addIcons.length; i++) {
  let button = addIcons[i];
  button.addEventListener("click", addToCartClicked);
};

function addToCartClicked(event) {
  let button = event.target;
  let productBox = button.parentElement.parentElement.parentElement;
  let imgSrc = productBox.querySelector("img").src;
  let title = productBox.querySelector("h3").innerText;
  let price = productBox.querySelector("span").innerText;
  addToCart(imgSrc, title, price);
  updateCartTotal();
};

function addToCart(imgSrc, title, price) {
  let cartImgSrc = document.querySelectorAll(".cart-box img");
  let quantityInputs = document.querySelectorAll(".cart-box input");
  for (let i = 0; i < cartImgSrc.length; i++) {
    if (cartImgSrc[i].src === imgSrc ) {
      quantityInputs[i].value++;
      return;
    };
  };
  let newBox = document.createElement("div");
  let cartBoxes = document.querySelector(".cart-boxes");
  newBox.classList.add("cart-box");
  let newBoxContent = `
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
  cartBoxes.appendChild(newBox);
  newBox.querySelector(".remove-icon i").addEventListener("click", removeFromCart);
  newBox.querySelector(".cart-box input").addEventListener("change", updateCartTotal);
};

function updateCartTotal() {
  let total = 0;
  let cartBoxes = document.querySelectorAll(".cart-box");
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.querySelector("span").innerHTML.replace("$", "");
    let price = parseFloat(priceElement);
    let quantity = cartBox.querySelector("input").value;
    total = total + (price * quantity);
    console.log(total);
  };
  document.querySelector(".subtotal-number").innerText = "$" + total;
};