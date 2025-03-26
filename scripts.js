// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("Loginbutton");
    const loginOptions = document.getElementById("login-options");
    const buttonContainer = document.querySelector(".button-container");

    // Show login options and hide initial buttons
    loginButton.addEventListener("click", function () {
        buttonContainer.classList.add("hidden");
        loginOptions.classList.remove("hidden");
    });

    // Add similar behavior for "Vendeg" button if needed
    const guestButton = document.getElementById("Vendeg");
    guestButton.addEventListener("click", function () {
        buttonContainer.classList.add("hidden");
        // Add any specific behavior for the "Vendeg" button here
    });

    // QR Code Scanner
    const qrDisplay = document.getElementById("qr_display");
    const qrContainer = document.getElementById("qr-container");

    function onScanSuccess(decodeText, decodeResult) {
        alert("QR Code Scanned: " + decodeText);
        qrDisplay.innerHTML = `Scanned QR Code: ${decodeText}`;
    }

    // Initialize QR Code Scanner
    if (qrContainer) {
        const htmlScanner = new Html5Qrcode("my-qr-reader", { fps: 10, qrbox: 250 });
        htmlScanner.render(onScanSuccess);
    }
});