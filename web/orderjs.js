// Object to store cart items and their quantities and prices
const cart = {};

// Function to handle adding items to the cart
function addToCart(itemName, itemPrice) {
  // Check if the item is already in the cart
  if (cart[itemName]) {
    cart[itemName].quantity++; // Increment the quantity
  } else {
    cart[itemName] = { price: itemPrice, quantity: 1 }; // Add the item with price and quantity
  }
  updateCartDisplay(); // Update the cart display
}

// Function to update the cart display
function updateCartDisplay() {
  const cartList = document.getElementById('cart-list'); // Get the cart list element
  cartList.innerHTML = ''; // Clear the current cart display

  // Loop through the cart object and display each item with its quantity and total price
  for (const [itemName, itemData] of Object.entries(cart)) {
    const li = document.createElement('li'); // Create a new list item
    li.textContent = `${itemName} x${itemData.quantity} - ${itemData.price * itemData.quantity} Ft`; // Set the text content to show the item, quantity, and total price

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.style.color = 'white';
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.border = 'none';
    deleteButton.style.borderRadius = '5px';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.cursor = 'pointer';

    // Add an event listener to the delete button
    deleteButton.onclick = () => {
      delete cart[itemName]; // Remove the item from the cart
      updateCartDisplay(); // Update the cart display
    };

    li.appendChild(deleteButton); // Add the delete button to the list item
    cartList.appendChild(li); // Add the list item to the cart list
  }
}

// Function to handle checkout
function checkout() {
  alert('Checkout complete!'); // Show a checkout complete message
  Object.keys(cart).forEach(key => delete cart[key]); // Clear the cart
  updateCartDisplay(); // Update the cart display
}