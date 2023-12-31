// host

const { host } = new URL(window.location.href);





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
            const response = await axios.post(`http://${host}/user/login`, loginData);
            const {success, token, isPremium} = response.data;
            if (success) {
                localStorage.setItem('token', token);
                if(isPremium) localStorage.setItem('isPremium', 'true');
                else localStorage.setItem('isPremium', 'false');
                window.location.href = 'expense.html';
            } else {
                showAlert('Something went wrong. Please try again.', 'danger');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                showAlert(error.response.data , 'danger');
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
