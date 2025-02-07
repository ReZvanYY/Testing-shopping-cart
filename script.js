const shoppingCartArea = document.querySelector(".shopping_cart_area");

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const counterElement = document.createElement("p");
const totalSumElement = document.createElement("p");

counterElement.textContent = "Items in your cart: 0";
totalSumElement.textContent = "Total: $0.00";

function saveCartToStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function updateShoppingCart() {
  if (!shoppingCartArea) return;

  shoppingCartArea.innerHTML = "";

  shoppingCartArea.appendChild(counterElement);
  shoppingCartArea.appendChild(totalSumElement);

  if (cartItems.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Your cart is empty";
    shoppingCartArea.appendChild(emptyMessage);
  } else {
    cartItems.forEach((item, index) => {
      const cartItemElements = document.createElement("section");
      cartItemElements.innerHTML = `        
    <p>Item: ${item.name}</p>
    <p>Price: $${item.price}</p>
    <p>Quantity: ${item.quantity}</p>
    <button class="remove_from_cart" data-index="${index}">Remove</button>
    `;
      shoppingCartArea.appendChild(cartItemElements);
    });

    const itemCount = cartItems.length;
    const totalSum = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    counterElement.textContent = `Items in the cart: ${itemCount}`;
    totalSumElement.textContent = `Total: $${totalSum.toFixed(2)}`;
  }
}

function addToCart(itemName, itemPrice) {
  if (!itemName || !itemPrice) {
    console.log("Invalid item name or price");
    return;
  }
  const existingItem = cartItems.find((item) => item.name === itemName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
  }
  saveCartToStorage();
  updateShoppingCart();
}

function removeFromCart (index){
    if(index < 0 || index >= cartItems.length){
        console.error ('Invalid index');
        return;
    }
    cartItems.splice(index, 1);
    saveCartToStorage();
    updateShoppingCart();
}
document.querySelectorAll(".buy_now").forEach((button) =>{
    button.addEventListener ("click", () => {
        const parent = button.parentNode.parentNode;
        const itemName = parent.querySelector(".item_name").textContent;
        const itemPrice = parseFloat(parent.querySelector(".item_price").textContent.split(": ")[1]);
        addToCart(itemName, itemPrice);
    });
});

if (shoppingCartArea) {
    shoppingCartArea.addEventListener ("click", (event) =>{
        if (event.target.classList.contains("remove_from_cart")){
            const index = parseInt(event.target.dataset.index);
            removeFromCart(index);
        }
    });
}

if(shoppingCartArea){
    updateShoppingCart();
}

const form = document.getElementById('checkout-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const orderData = {};

    for (const [key, value] of formData) {
        orderData[key] = value;
    }

    localStorage.setItem('orderData', JSON.stringify(orderData));
    console.log('Order data: ', orderData);

    window.location.href = 'confirmation.html';
});
