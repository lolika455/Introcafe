const cart = {};

function addToCart(itemName, itemPrice) {
    if (cart[itemName]) {
        cart[itemName].quantity++;
    } else {
        cart[itemName] = { price: itemPrice, quantity: 1 };
    }
    updateCartDisplay();
}

function showOrderTypeModal() {
    const modal = document.getElementById('order-type-modal');
    modal.style.display = 'flex';
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';

    for (const [itemName, itemData] of Object.entries(cart)) {
        const li = document.createElement('li');
        li.textContent = `${itemName} x${itemData.quantity} - ${itemData.price * itemData.quantity} Ft`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.style.color = 'white';
        deleteButton.style.fontSize = '20px';
        deleteButton.style.width = '30px';
        deleteButton.style.height = '30px';
        deleteButton.style.backgroundColor = 'red';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '5px';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.cursor = 'pointer';

        deleteButton.onclick = () => {
            if (cart[itemName].quantity > 1) {
                cart[itemName].quantity--;
            } else {
                delete cart[itemName];
            }
            updateCartDisplay();
        };

        li.appendChild(deleteButton);
        cartList.appendChild(li);
    }

    const totalPrice = document.getElementById('total-price');
    totalPrice.textContent = `Végösszeg: ${Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0)} Ft`;
}

function setOrderType(type) {
    uploadedTakeway = type;
    localStorage.setItem('orderType', type);
  
    const modal = document.getElementById('order-type-modal');
    modal.style.display = 'none';
  
    const uploadedItems = Object.entries(cart)
      .map(([itemName, itemData]) => `${itemName} x${itemData.quantity}`)
      .join('\n');
  
    const uploadedTotalCost = Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  
    console.log(uploadedTakeway);
    console.log(uploadedItems);
    console.log(uploadedTotalCost);
  
    // Prepare data for API
    
    // Send POST request to API
    // fetch('/api/uploadneworder', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(orderData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Order uploaded successfully:', data);
    // })
    // .catch(error => {
    //   console.error('Error uploading order:', error);
    // });
    const orderData = {
      uploadedTakeway: uploadedTakeway,
      uploadedItems: uploadedItems,
      uploadedTotalCost: uploadedTotalCost*1
    };
    console.log(JSON.stringify(orderData));
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
            {
                console.log("Sikeres POST kérés");
            }
        else if (xmlhttp.readyState == 4)
        {
            console.log("Hiba a POST kérés során: "+ xmlhttp.status);
        }
    };
    xmlhttp.open("POST","http://localhost:5154/api/uploadneworder",true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(orderData));
  
    Object.keys(cart).forEach(key => delete cart[key]);
    localStorage.removeItem('orderType');
    updateCartDisplay();
  }
  

function checkout() {
  const modal = document.getElementById('order-type-modal');
  modal.style.display = 'flex';
}

function cancel() {
    localStorage.removeItem('orderType');
}