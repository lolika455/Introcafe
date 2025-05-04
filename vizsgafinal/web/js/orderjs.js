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
    updateCartCounter();
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
        uploadedUserId: loggedInUser.uid,
        uploadedTakeway: type,
        uploadedItems: uploadedItems,
        uploadedTotalCost: finalTotalCost,
        uploadedUsedIntropoints: usedIntropoints,
    };

    console.log('OrderData:', orderData);

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Sikeres POST kérés");

            const updateSuccess = await updateUserIntropoints(loggedInUser.uid, loggedInUser.intropoints);
            if (!updateSuccess) {
                console.error("Hiba az intropontok frissítése során.");
            }
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
        intropointsModal.style.display = 'flex';
        const cartModal = document.getElementById('cart-modal');
        cartModal.style.display = 'none';
    }
    fetchAndDisplayIntropoints();
}

function cancel() {
    localStorage.removeItem('orderType');
    Object.keys(cart).forEach(key => delete cart[key]);
}

function showCartModal() {
    const modal = document.getElementById('cart-modal');
    const cartList = document.getElementById('cart-modal-list');
    const totalPrice = document.getElementById('cart-modal-total-price');

    cartList.innerHTML = '';

    for (const [itemName, itemData] of Object.entries(cart)) {
        const li = document.createElement('li');
        li.textContent = `${itemName} x${itemData.quantity} - ${itemData.price * itemData.quantity} Ft`;

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

        deleteButton.onclick = () => {
            if (cart[itemName].quantity > 1) {
                cart[itemName].quantity--;
            } else {
                delete cart[itemName];
            }
            updateCartCounter();
            showCartModal();
        };

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

        addButton.onclick = () => {
            cart[itemName].quantity++;
            updateCartCounter();
            showCartModal();
        };

        li.appendChild(deleteButton);
        li.appendChild(addButton);
        cartList.appendChild(li);
    }

    totalPrice.textContent = `Végösszeg: ${Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0)} Ft`;

    modal.style.display = 'flex';
}

function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

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
            console.error("Az intropontok lekérése sikertelen volt:", response.statusText);
            document.getElementById('intropoints-modal-text').textContent = "Intropontok: Hiba történt a lekérés során.";
        }
    } catch (error) {
        console.error("Lekérdezés közbeni hiba:", error);
        document.getElementById('intropoints-modal-text').textContent = "Intropontok: Hiba történt a lekérés során.";
    }
}

let finalTotalCost = 0;

function showIntropointsModal() {
    const intropointsModal = document.getElementById('intropoints-modal');
    intropointsModal.style.display = 'flex';
}

function skipIntropoints() {
    const uploadedTotalCost = Object.values(cart).reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    finalTotalCost = uploadedTotalCost;

    console.log(`Kiszámított végösszeg: ${finalTotalCost}`);

    const intropointsModal = document.getElementById('intropoints-modal');
    intropointsModal.style.display = 'none';

    const orderTypeModal = document.getElementById('order-type-modal');
    orderTypeModal.style.display = 'flex';
}

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
        const response = await fetch(`http://localhost:5154/api/user/intropoints?uid=${loggedInUser.uid}`);
        if (!response.ok) {
            console.error("Hiba az intropontok lekérése során:", response.statusText);
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: "Nem sikerült lekérni az Intropontokat.",
            });
            return;
        }

        const data = await response.json();
        const userIntropoints = data.intropoints || 0;

        if (userIntropoints >= uploadedTotalCost) {
            finalTotalCost = 0;
            usedIntropoints = uploadedTotalCost;
        } else {
            finalTotalCost = uploadedTotalCost - userIntropoints;
            usedIntropoints = userIntropoints;
        }

        loggedInUser.intropoints = Math.max(0, userIntropoints - usedIntropoints);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

        console.log(`Számolt végösszeg: ${finalTotalCost}`);
        console.log(`Felhasznált intropontok: ${usedIntropoints}`);
        console.log(`Megmaradt intropontok: ${loggedInUser.intropoints}`);

        const intropointsModal = document.getElementById('intropoints-modal');
        intropointsModal.style.display = 'none';

        const orderTypeModal = document.getElementById('order-type-modal');
        orderTypeModal.style.display = 'flex';
    } catch (error) {
        console.error("Hiba az intropontok lekérések során:", error);
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
            console.error("Hiba az intropontok frissítése során:", errorData.message || response.statusText);
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: errorData.message || "Nem sikerült frissíteni az Intropontokat.",
            });
            return false;
        }

        console.log("Intropontok frissítve:");
        return true;
    } catch (error) {
        console.error("Hiba az intropontok frissítése során", error);
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Hiba történt az Intropontok frissítése során.",
        });
        return false;
    }
}