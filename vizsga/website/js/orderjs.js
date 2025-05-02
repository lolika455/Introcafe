const cart = {};

function addToCart(itemName, itemPrice) {
    let timerInterval;
    Swal.fire({
    title: "Termék hozzáadva!",
    timer: 2000,
    willClose: () => {
    clearInterval(timerInterval);
    }});

    if (cart[itemName]) {
        cart[itemName].quantity++;
    } else {
        cart[itemName] = { price: itemPrice, quantity: 1 };
    }
    updateCartCounter(); // Update the counter
}

function showOrderTypeModal() {
    const modal = document.getElementById('order-type-modal');
    modal.style.display = 'flex';
}

function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
}

function setOrderType(type) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Retrieve logged-in user data
    console.log('LoggedInUser:', loggedInUser); // Debugging: Log the logged-in user

    if (!loggedInUser || !loggedInUser.uid) {
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Be kell jelentkezned a rendelés leadásához!",
        });
        return;
    }

    const uploadedItems = Object.entries(cart)
        .map(([itemName, itemData]) => `${itemName} x${itemData.quantity}`)
        .join('\n');
    const uploadedTakeway = type;

    const uploadedTotalCost = Object.values(cart).reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const orderData = {
        uploadedUserId: loggedInUser.uid, // Include the logged-in user's ID
        uploadedTakeway: uploadedTakeway,
        uploadedItems: uploadedItems,
        uploadedTotalCost: uploadedTotalCost,
    };

    console.log('OrderData:', orderData); // Debugging: Log the order data

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Sikeres POST kérés");
        } else if (xmlhttp.readyState == 4) {
            console.log("Hiba a POST kérés során: " + xmlhttp.status);
        }
    };
    xmlhttp.open("POST", "http://localhost:5154/api/uploadneworder", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(orderData));

    Object.keys(cart).forEach((key) => delete cart[key]);
    updateCartCounter();
    localStorage.removeItem('orderType');
    const modal = document.getElementById('order-type-modal');
    modal.style.display = 'none';
    Swal.fire({
        icon: "success",
        title: "Sikeres rendelés!",
        text: "Köszönjük, hogy minket választott :)",
    });
}

// function setOrderType(type) {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Retrieve logged-in user data
//     // if (!loggedInUser || !loggedInUser.id) {
//     //     Swal.fire({
//     //         icon: "error",
//     //         title: "Hiba!",
//     //         text: "Be kell jelentkezned a rendelés leadásához!",
//     //     });
//     //     return;
//     // }

//     const uploadedItems = Object.entries(cart)
//         .map(([itemName, itemData]) => `${itemName} x${itemData.quantity}`)
//         .join('\n');
//     const uploadedTakeway = type;
//     localStorage.setItem('orderType', type);

//     const uploadedTotalCost = Object.values(cart).reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//     );

//     const orderData = {
//         uploadedUserId: loggedInUser.id, // Include the logged-in user's ID
//         uploadedTakeway: uploadedTakeway,
//         uploadedItems: uploadedItems,
//         uploadedTotalCost: uploadedTotalCost,
//     };

//     console.log(JSON.stringify(orderData));

//     const xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Sikeres POST kérés");
//         } else if (xmlhttp.readyState == 4) {
//             console.log("Hiba a POST kérés során: " + xmlhttp.status);
//         }
//     };
//     xmlhttp.open("POST", "http://localhost:5154/api/uploadneworder", true);
//     xmlhttp.setRequestHeader("Content-Type", "application/json");
//     xmlhttp.send(JSON.stringify(orderData));

//     Object.keys(cart).forEach((key) => delete cart[key]);
//     updateCartCounter(); // Update the counter
//     localStorage.removeItem('orderType');
//     Swal.fire({
//         icon: "success",
//         title: "Sikeres rendelés!",
//         text: "Köszönjük, hogy minket választott :)",
//     });
// }
  

function checkout() {
    const uploadedItems = Object.entries(cart)
      .map(([itemName, itemData]) => `${itemName} x${itemData.quantity}`)
      .join('\n');
    if(uploadedItems == "")
        {
            Swal.fire({
                icon: "error",
                title: "Hupsz!",
                text: "Nem adtál még semmit a kosaradhoz!",
            });
            return;
        }
        else
        {
            const modal = document.getElementById('order-type-modal');
            modal.style.display = 'flex';
            const cartmodal = document.getElementById('cart-modal');
            cartmodal.style.display = 'none';
        }
}

function cancel() {
    localStorage.removeItem('orderType');
    Object.keys(cart).forEach(key => delete cart[key]);
}

// function showCartModal() {
//     const modal = document.getElementById('cart-modal');
//     const cartList = document.getElementById('cart-modal-list');
//     const totalPrice = document.getElementById('cart-modal-total-price');

//     cartList.innerHTML = ''; // Clear the current list

//     for (const [itemName, itemData] of Object.entries(cart)) {
//         const li = document.createElement('li');
//         li.textContent = `${itemName} x${itemData.quantity} - ${itemData.price * itemData.quantity} Ft`;

//         // Create the delete button
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'X';
//         deleteButton.style.color = 'white';
//         deleteButton.style.fontSize = '20px';
//         deleteButton.style.width = '30px';
//         deleteButton.style.height = '30px';
//         deleteButton.style.backgroundColor = 'red';
//         deleteButton.style.border = 'none';
//         deleteButton.style.borderRadius = '5px';
//         deleteButton.style.marginLeft = '10px';
//         deleteButton.style.cursor = 'pointer';

//         // Add functionality to the delete button
//         deleteButton.onclick = () => {
//             if (cart[itemName].quantity > 1) {
//                 cart[itemName].quantity--; // Decrease quantity
//             } else {
//                 delete cart[itemName]; // Remove item from cart
//             }
//             showCartModal(); // Refresh the modal content
//         };

//         li.appendChild(deleteButton); // Add the delete button to the list item
//         cartList.appendChild(li); // Add the list item to the cart list
//     }

//     // Update the total price
//     totalPrice.textContent = `Végösszeg: ${Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0)} Ft`;

//     modal.style.display = 'flex'; // Show the modal
// }

function showCartModal() {
    const modal = document.getElementById('cart-modal');
    const cartList = document.getElementById('cart-modal-list');
    const totalPrice = document.getElementById('cart-modal-total-price');

    cartList.innerHTML = ''; // Clear the current list

    for (const [itemName, itemData] of Object.entries(cart)) {
        const li = document.createElement('li');
        li.textContent = `${itemName} x${itemData.quantity} - ${itemData.price * itemData.quantity} Ft`;

        // Create the delete button (red "X")
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '-';
        deleteButton.style.color = 'white';
        deleteButton.style.fontSize = '20px';
        deleteButton.style.width = '30px';
        deleteButton.style.height = '30px';
        deleteButton.style.backgroundColor = 'red';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '5px';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.cursor = 'pointer';

        // Add functionality to the delete button
        deleteButton.onclick = () => {
            if (cart[itemName].quantity > 1) {
                cart[itemName].quantity--; // Decrease quantity
            } else {
                delete cart[itemName]; // Remove item from cart
            }
            updateCartCounter(); // Update the counter
            showCartModal(); // Refresh the modal content
        };

        // Create the add button (green "+")
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.style.color = 'white';
        addButton.style.fontSize = '20px';
        addButton.style.width = '30px';
        addButton.style.height = '30px';
        addButton.style.backgroundColor = 'green';
        addButton.style.border = 'none';
        addButton.style.borderRadius = '5px';
        addButton.style.marginLeft = '10px';
        addButton.style.cursor = 'pointer';

        // Add functionality to the add button
        addButton.onclick = () => {
            cart[itemName].quantity++; // Increase quantity
            updateCartCounter(); // Update the counter
            showCartModal(); // Refresh the modal content
        };

        li.appendChild(deleteButton); // Add the delete button to the list item
        li.appendChild(addButton); // Add the add button to the list item
        cartList.appendChild(li); // Add the list item to the cart list
    }

    // Update the total price
    totalPrice.textContent = `Végösszeg: ${Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0)} Ft`;

    modal.style.display = 'flex'; // Show the modal
}

function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}
