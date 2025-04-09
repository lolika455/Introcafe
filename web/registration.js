document.getElementById("registration-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hide the registration form and show the success container
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("success-container").style.display = "block";

    // Update sikeres login
    const successMessage = document.querySelector("#success-container h2");
    successMessage.textContent = "Your login QR code";

    // QR code generation csinál a megadott username és password alapján
    const qrData = `Username: ${username}\nPassword: ${password}`;
    generateQRCode(qrData);
});

function generateQRCode(data) {
    const qrCodeContainer = document.getElementById("qr-code");
    qrCodeContainer.innerHTML = ""; // Clear ﮩـﮩﮩ٨ـ🫀ﮩ٨ـﮩﮩ٨ـ

    QRCode.toCanvas(qrCodeContainer, data, function (error) {
        if (error) {
            console.error("Error generating QR code:", error);
        } else {
            console.log("QR code generated successfully.");
        }
    });
}
