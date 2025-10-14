const API_URL = 'http://localhost:5000/api';

async function login() {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('message');

    if (!email || !password) {
        messageEl.textContent = 'Please enter both email and password';
        messageEl.style.color = 'red';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            messageEl.style.color = 'green';
            messageEl.textContent = 'Login successful! Token stored.';
        } else {
            messageEl.style.color = 'red';
            messageEl.textContent = data.error || data.message || 'Login failed';
        }
    } catch (error) {
        messageEl.style.color = 'red';
        messageEl.textContent = 'Network error. Please try again later.';
        console.error('Login error:', error);
    }
}
