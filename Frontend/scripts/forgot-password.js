// Select element

const email = document.querySelector('#forgot-email');
const sendBtn = document.querySelector('#send-btn');

// On click

sendBtn.addEventListener('click', sendEmail);
async function sendEmail(e) {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:4000/forgot-password', { email: email.value });
        console.log(res)
    } catch (error) {
        console.log(error.message);
    }
}