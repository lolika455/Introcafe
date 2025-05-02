const apiBaseUrl = "http://localhost:5154/api/auth"; // Replace with your API base URL

// async function register() {
//     const email = document.getElementById('register-email').value;
//     const password = document.getElementById('register-password').value;

//     if (!email || !password) {
//         Swal.fire({
//             icon: "error",
//             title: "Hiba!",
//             text: "Kérjük, töltsd ki az összes mezőt.",
//         });
//         return;
//     }

//     try {
//         const response = await fetch(`${apiBaseUrl}/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         if (response.ok) {
//             let timerInterval;
//             Swal.fire({
//             title: "Sikeres regisztráció!",
//             text: "Most már bejelentkezhetsz.",
//             timer: 2000,
//             willClose: () => {
//             clearInterval(timerInterval);
//         }});
//             showLogin();
//         } else {
//             const error = await response.json();
//             alert(`Regisztráció hiba: ${error.message}`);
//         }
//     } catch (error) {
//         console.error('Hiba a regisztáció során:', error);
//         let timerInterval;
//         Swal.fire({
//         title: "Hiba a regisztráció során!",
//         timer: 2000,
//         willClose: () => {
//         clearInterval(timerInterval);
//     }});
//     }
// }

async function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Email validation
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Kérjük, érvényes e-mail címet adj meg.",
        });
        return;
    }

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Kérjük, töltsd ki az összes mezőt.",
        });
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            let timerInterval;
            Swal.fire({
                title: "Sikeres regisztráció!",
                text: "Most már bejelentkezhetsz.",
                timer: 2000,
                willClose: () => {
                    clearInterval(timerInterval);
                }
            });
            showLogin();
        } else {
            const error = await response.json();
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: `Regisztráció hiba: ${error.message}`,
            });
        }
    } catch (error) {
        console.error('Hiba a regisztráció során:', error);
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Hiba történt a regisztráció során. Kérjük, próbáld újra.",
        });
    }
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Hiba!",
            text: "Kérjük, töltsd ki az összes mezőt.",
        });
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Bejelentkezés válasz:', data); // Debugging: Log the response
            if (!data.uid) {
                alert('Bejelentkezés sikertelen: Nincs UID a válaszban.');
                return;
            }
            // Save the logged-in user's data locally (e.g., token, email, id)
            localStorage.setItem('loggedInUser', JSON.stringify(data));
            window.location.href = './index.html';
        } else {
            const error = await response.json();
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: "Érvénytelen e-mail cím vagy jelszó.",
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = './index.html';
}

function showRegister() {
    document.getElementById('registration-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

function showLogin() {
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}