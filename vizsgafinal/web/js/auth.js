const apiBaseUrl = "http://localhost:5154/api/auth";

async function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

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
        const checkResponse = await fetch(`${apiBaseUrl}/check-email?email=${encodeURIComponent(email)}`, {
            method: 'GET',
        });

        if (checkResponse.ok) {
            const checkData = await checkResponse.json();
            if (checkData.exists) {
                Swal.fire({
                    icon: "error",
                    title: "Hiba!",
                    text: "Ez az e-mail cím már regisztrálva van.",
                });
                return;
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Hiba!",
                text: "Hiba történt az e-mail ellenőrzése során.",
            });
            return;
        }

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
            console.log('Bejelentkezés válasz:', data);
            if (!data.uid) {
                alert('Bejelentkezés sikertelen: Nincs UID a válaszban.');
                return;
            }
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
        console.error('Hiba történt a bejelentkezés során:', error);
        alert('Hiba történt a bejelentkezés során. Kérjük, próbáld újra.');
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