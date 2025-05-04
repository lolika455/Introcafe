const cart = {};
let usedIntropoints = 0;

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

// function setOrderType(type) {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//     if (!loggedInUser || !loggedInUser.uid) {
//         Swal.fire({
//             icon: "error",
//             title: "Hiba!",
//             text: "Be kell jelentkezned a rendelés leadásához!",
//         });
//         return;
//     }

//     const uploadedItems = Object.entries(cart)
//         .map(([itemName, itemData]) => `${itemName} x${itemData.quantity}`)
//         .join('\n');

//     const orderData = {
//         uploadedUserId: loggedInUser.uid, // Include the logged-in user's ID
//         uploadedTakeway: type,
//         uploadedItems: uploadedItems,
//         uploadedTotalCost: finalTotalCost, // Use the updated total cost
//     };

//     console.log('OrderData:', orderData); // Debugging: Log the order data

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
//     updateCartCounter();
//     localStorage.removeItem('orderType');
//     const modal = document.getElementById('order-type-modal');
//     modal.style.display = 'none';
//     Swal.fire({
//         icon: "success",
//         title: "Sikeres rendelés!",
//         text: "Köszönjük, hogy minket választott :)",
//     });
// }

// function setOrderType(type) {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//     if (!loggedInUser || !loggedInUser.uid) {
//         Swal.fire({
//             icon: "error",
//             title: "Hiba!",
//             text: "Be kell jelentkezned a rendelés leadásához!",
//         });
//         return;
//     }

//     const uploadedItems = Object.entries(cart)
//         .map(([itemName, itemData]) => `${itemName} x${itemData.quantity}`)
//         .join('\n');

//     // Calculate the used Intropoints
//     const uploadedUsedIntropoints = loggedInUser.intropoints || 0;

//     const orderData = {
//         uploadedUserId: loggedInUser.uid, // Include the logged-in user's ID
//         uploadedTakeway: type,
//         uploadedItems: uploadedItems,
//         uploadedTotalCost: finalTotalCost, // Use the updated total cost
//         uploadedUsedIntropoints: uploadedUsedIntropoints, // Include the remaining Intropoints
//     };

//     console.log('OrderData:', orderData); // Debugging: Log the order data

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
//     updateCartCounter();
//     localStorage.removeItem('orderType');
//     const modal = document.getElementById('order-type-modal');
//     modal.style.display = 'none';
//     Swal.fire({
//         icon: "success",
//         title: "Sikeres rendelés!",
//         text: "Köszönjük, hogy minket választott :)",
//     });
// }

// function setOrderType(type) {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//     if (!loggedInUser || !loggedInUser.uid) {
//         Swal.fire({
//             icon: "error",
//             title: "Hiba!",
//             text: "Be kell jelentkezned a rendelés leadásához!",
//         });
//         return;
//     }

//     const uploadedItems = Object.entries(cart)
//         .map(([itemName, itemData]) => `${itemName} x${itemData.quantity}`)
//         .join('\n');

//     // Calculate the used Intropoints
//     const originalIntropoints = loggedInUser.intropoints || 0;
//     const uploadedUsedIntropoints = originalIntropoints - loggedInUser.intropoints;

//     const orderData = {
//         uploadedUserId: loggedInUser.uid, // Include the logged-in user's ID
//         uploadedTakeway: type, // Order type (Helyben or Elvitel)
//         uploadedItems: uploadedItems, // Items in the cart
//         uploadedTotalCost: finalTotalCost, // Use the updated total cost
//         uploadedUsedIntropoints: uploadedUsedIntropoints, // Send the amount of Intropoints used
//     };

//     console.log('OrderData:', orderData); // Debugging: Log the order data

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

//     // Clear the cart and reset the UI
//     Object.keys(cart).forEach((key) => delete cart[key]);
//     updateCartCounter();
//     localStorage.removeItem('orderType');
//     const modal = document.getElementById('order-type-modal');
//     modal.style.display = 'none';
//     Swal.fire({
//         icon: "success",
//         title: "Sikeres rendelés!",
//         text: "Köszönjük, hogy minket választott :)",
//     });
// }

// function setOrderType(type) {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//     if (!loggedInUser || !loggedInUser.uid) {
//         Swal.fire({
//             icon: "error",
//             title: "Hiba!",
//             text: "Be kell jelentkezned a rendelés leadásához!",
//         });
//         return;
//     }

//     const uploadedItems = Object.entries(cart)
//         .map(([itemName, itemData]) => `${itemName} x${itemData.quantity}`)
//         .join('\n');

//     const orderData = {
//         uploadedUserId: loggedInUser.uid, // Include the logged-in user's ID
//         uploadedTakeway: type, // Order type (Helyben or Elvitel)
//         uploadedItems: uploadedItems, // Items in the cart
//         uploadedTotalCost: finalTotalCost, // Use the updated total cost
//         uploadedUsedIntropoints: usedIntropoints, // Send the amount of Intropoints used
//     };

//     console.log('OrderData:', orderData); // Debugging: Log the order data

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

//     // Clear the cart and reset the UI
//     Object.keys(cart).forEach((key) => delete cart[key]);
//     updateCartCounter();
//     localStorage.removeItem('orderType');
//     const modal = document.getElementById('order-type-modal');
//     modal.style.display = 'none';
//     Swal.fire({
//         icon: "success",
//         title: "Sikeres rendelés!",
//         text: "Köszönjük, hogy minket választott :)",
//     });
// }

async function setOrderType(type) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

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

    const orderData = {
        uploadedUserId: loggedInUser.uid, // Include the logged-in user's ID
        uploadedTakeway: type, // Order type (Helyben or Elvitel)
        uploadedItems: uploadedItems, // Items in the cart
        uploadedTotalCost: finalTotalCost, // Use the updated total cost
        uploadedUsedIntropoints: usedIntropoints, // Send the amount of Intropoints used
    };

    console.log('OrderData:', orderData); // Debugging: Log the order data

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Sikeres POST kérés");

            // Update the user's Intropoints in the database
            const updateSuccess = await updateUserIntropoints(loggedInUser.uid, loggedInUser.intropoints);
            if (!updateSuccess) {
                console.error("Failed to update Intropoints after order.");
            }
        } else if (xmlhttp.readyState == 4) {
            console.log("Hiba a POST kérés során: " + xmlhttp.status);
        }
    };
    xmlhttp.open("POST", "http://localhost:5154/api/uploadneworder", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(orderData));

    // Clear the cart and reset the UI
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
  

// function checkout() {
//     const uploadedItems = Object.entries(cart)
//       .map(([itemName, itemData]) => `${itemName} x${itemData.quantity}`)
//       .join('\n');
//     if(uploadedItems == "")
//         {
//             Swal.fire({
//                 icon: "error",
//                 title: "Hupsz!",
//                 text: "Nem adtál még semmit a kosaradhoz!",
//             });
//             return;
//         }
//         else
//         {
//             const modal = document.getElementById('order-type-modal');
//             modal.style.display = 'flex';
//             const cartmodal = document.getElementById('cart-modal');
//             cartmodal.style.display = 'none';
//         }
// }

function checkout() {
    const uploadedItems = Object.entries(cart)
        .map(([itemName, itemData]) => `${itemName} x${itemData.quantity}`)
        .join('\n');
    if (uploadedItems === "") {
        Swal.fire({
            icon: "error",
            title: "Hupsz!",
            text: "Nem adtál még semmit a kosaradhoz!",
        });
        return;
    } else {
        const intropointsModal = document.getElementById('intropoints-modal');
        intropointsModal.style.display = 'flex'; // Show the Intropoints modal
        const cartModal = document.getElementById('cart-modal');
        cartModal.style.display = 'none'; // Hide the cart modal
    }
    fetchAndDisplayIntropoints();
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

// async function fetchAndDisplayIntropoints() {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//     if (!loggedInUser || !loggedInUser.uid) {
//         document.getElementById('intropoints-display').textContent = "Intropontok: Nincs bejelentkezve.";
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:5154/api/user/intropoints?uid=${loggedInUser.uid}`);
//         if (response.ok) {
//             const data = await response.json();
//             const intropoints = data.intropoints || 0;
//             document.getElementById('intropoints-display').textContent = `Intropontok: ${intropoints}`;
//         } else {
//             console.error("Failed to fetch Intropoints:", response.statusText);
//             document.getElementById('intropoints-display').textContent = "Intropontok: Hiba történt a lekérés során.";
//         }
//     } catch (error) {
//         console.error("Error fetching Intropoints:", error);
//         document.getElementById('intropoints-display').textContent = "Intropontok: Hiba történt a lekérés során.";
//     }
// }

async function fetchAndDisplayIntropoints() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || !loggedInUser.uid) {
        document.getElementById('intropoints-modal-text').textContent = "Intropontok: Nincs bejelentkezve.";
        return;
    }

    try {
        const response = await fetch(`http://localhost:5154/api/user/intropoints?uid=${loggedInUser.uid}`);
        if (response.ok) {
            const data = await response.json();
            const intropoints = data.intropoints || 0;
            document.getElementById('intropoints-modal-text').textContent = `Az Ön Intropontjai: ${intropoints}`;
        } else {
            console.error("Failed to fetch Intropoints:", response.statusText);
            document.getElementById('intropoints-modal-text').textContent = "Intropontok: Hiba történt a lekérés során.";
        }
    } catch (error) {
        console.error("Error fetching Intropoints:", error);
        document.getElementById('intropoints-modal-text').textContent = "Intropontok: Hiba történt a lekérés során.";
    }
}













let finalTotalCost = 0; // Global variable to store the final total cost

// function showIntropointsModal() {
//     const intropointsModal = document.getElementById('intropoints-modal');
//     intropointsModal.style.display = 'flex'; // Show the Intropoints modal
// }

function showIntropointsModal() {
    const intropointsModal = document.getElementById('intropoints-modal');
    intropointsModal.style.display = 'flex'; // Show the Intropoints modal // Update the Intropoints text
}

function skipIntropoints() {
    const uploadedTotalCost = Object.values(cart).reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    finalTotalCost = uploadedTotalCost; // No points applied, use the original total cost

    console.log(`Final Total Cost: ${finalTotalCost}`);

    // Close the Intropoints modal and open the order type modal
    const intropointsModal = document.getElementById('intropoints-modal');
    intropointsModal.style.display = 'none';

    const orderTypeModal = document.getElementById('order-type-modal');
    orderTypeModal.style.display = 'flex';
}

// async function useIntropoints() {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//     const uploadedTotalCost = Object.values(cart).reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//     );

//     if (!loggedInUser || !loggedInUser.uid) {
//         Swal.fire({
//             icon: "error",
//             title: "Hiba!",
//             text: "Be kell jelentkezned a rendelés leadásához!",
//         });
//         return;
//     }

//     try {
//         // Fetch the user's Intropoints from the API
//         const response = await fetch(`http://localhost:5154/api/user/intropoints?uid=${loggedInUser.uid}`);
//         if (!response.ok) {
//             console.error("Failed to fetch Intropoints:", response.statusText);
//             Swal.fire({
//                 icon: "error",
//                 title: "Hiba!",
//                 text: "Nem sikerült lekérni az Intropontokat.",
//             });
//             return;
//         }

//         const data = await response.json();
//         const userIntropoints = data.intropoints || 0;

//         // Calculate the final total cost after applying Intropoints
//         let intropointsUsed = 0;
//         if (userIntropoints >= uploadedTotalCost) {
//             finalTotalCost = 0; // If points are greater than or equal to the total cost
//             intropointsUsed = uploadedTotalCost; // Use only the amount equal to the total cost
//         } else {
//             finalTotalCost = uploadedTotalCost - userIntropoints; // Deduct points from the total cost
//             intropointsUsed = userIntropoints; // Use all available Intropoints
//         }

//         // Update the user's Intropoints in the database (mocked here)
//         loggedInUser.intropoints = Math.max(0, userIntropoints - intropointsUsed);
//         localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

//         console.log(`Final Total Cost: ${finalTotalCost}`);
//         console.log(`Intropoints Used: ${intropointsUsed}`);
//         console.log(`Remaining Intropoints: ${loggedInUser.intropoints}`);

//         // Close the Intropoints modal and open the order type modal
//         const intropointsModal = document.getElementById('intropoints-modal');
//         intropointsModal.style.display = 'none';

//         const orderTypeModal = document.getElementById('order-type-modal');
//         orderTypeModal.style.display = 'flex';
//     } catch (error) {
//         console.error("Error fetching Intropoints:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Hiba!",
//             text: "Hiba történt az Intropontok lekérése során.",
//         });
//     }
// }

async function useIntropoints() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const uploadedTotalCost = Object.values(cart).reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (!loggedInUser || !loggedInUser.uid) {
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Be kell jelentkezned a rendelés leadásához!",
        });
        return;
    }

    try {
        // Fetch the user's Intropoints from the API
        const response = await fetch(`http://localhost:5154/api/user/intropoints?uid=${loggedInUser.uid}`);
        if (!response.ok) {
            console.error("Failed to fetch Intropoints:", response.statusText);
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: "Nem sikerült lekérni az Intropontokat.",
            });
            return;
        }

        const data = await response.json();
        const userIntropoints = data.intropoints || 0;

        // Calculate the final total cost after applying Intropoints
        if (userIntropoints >= uploadedTotalCost) {
            finalTotalCost = 0; // If points are greater than or equal to the total cost
            usedIntropoints = uploadedTotalCost; // Use only the amount equal to the total cost
        } else {
            finalTotalCost = uploadedTotalCost - userIntropoints; // Deduct points from the total cost
            usedIntropoints = userIntropoints; // Use all available Intropoints
        }

        // Update the user's Intropoints in the database (mocked here)
        loggedInUser.intropoints = Math.max(0, userIntropoints - usedIntropoints);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        console.log(`Final Total Cost: ${finalTotalCost}`);
        console.log(`Intropoints Used: ${usedIntropoints}`);
        console.log(`Remaining Intropoints: ${loggedInUser.intropoints}`);

        // Close the Intropoints modal and open the order type modal
        const intropointsModal = document.getElementById('intropoints-modal');
        intropointsModal.style.display = 'none';

        const orderTypeModal = document.getElementById('order-type-modal');
        orderTypeModal.style.display = 'flex';
    } catch (error) {
        console.error("Error fetching Intropoints:", error);
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Hiba történt az Intropontok lekérése során.",
        });
    }
}

async function updateUserIntropoints(uid, newIntropoints) {
    try {
        const response = await fetch("http://localhost:5154/api/user/update-intropoints", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Uid: uid,
                NewIntropoints: newIntropoints,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to update Intropoints:", errorData.message || response.statusText);
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: errorData.message || "Nem sikerült frissíteni az Intropontokat.",
            });
            return false;
        }

        console.log("User Intropoints updated successfully.");
        return true;
    } catch (error) {
        console.error("Error updating Intropoints:", error);
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Hiba történt az Intropontok frissítése során.",
        });
        return false;
    }
}