document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('login-form');
    const alertDiv = document.getElementById('alert-message');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const loginData = {
            email,
            password
        };

        try {
            const response = await axios.post('http://localhost:4000/user/login', loginData);
            if (response.data.success) {
                showAlert('Login successful!', 'success');
            } else {
                showAlert('Something went wrong. Please try again.', 'danger');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                showAlert(error.response.data.message, 'danger');
            } else {
                showAlert('Something went wrong. Please try again.', 'danger');
            }
        }
    });

    function showAlert(message, type) {
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertDiv.style.display = '';

        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 5000);
    }
});
