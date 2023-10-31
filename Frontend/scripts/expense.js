// Selecting elements

const premiumBtn = document.querySelector('#premium-btn');
const form = document.querySelector('#add-form');
const amount = document.querySelector('#form-amount');
const category = document.querySelector('#form-category');
const des = document.querySelector('#form-des');
const list = document.querySelector('#list');
const viewReportBtn = document.querySelector('#view-report-btn');
const viewLeaderboardBtn = document.querySelector('#view-leaderboard-btn');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');

const api = 'http://localhost:4000/expense'
const token = localStorage.getItem('token');
axios.defaults.headers.common['authorization'] = token;

const isPremium = localStorage.getItem('isPremium');


// Go premium

premiumBtn.addEventListener('click', goPremium);
async function goPremium(e) {
    try {
        const { data: {key, order} } = await axios.get('http://localhost:4000/premium/buy');
        const options = {
            key,
            order_id: order.id,
            'handler': async res => {
                await axios.post('http://localhost:4000/premium/buy', {orderId: order.id, paymentId: res.razorpay_payment_id});
                alert('You are now Premium member');
                isPremium = true;
                loadPremiumFeatures();
            }
        }
        const rzp = new Razorpay(options);
        rzp.open();
        e.preventDefault();
        rzp.on('payment.failed', async res => {
            await axios.post('http://localhost:4000/premium/buy', {orderId: order.id});
            alert('Payment failed');
        })
    } catch(error) {
        handelErrors(error);
    }
}




//on refresh

const limit = 1;
const offset = 0;

window.addEventListener('DOMContentLoaded', onRefresh);
async function onRefresh() {
    try {
        loadExpenses(offset);
        if(isPremium === 'true') loadPremiumFeatures();
    } catch (error) {
        handelErrors(error);
    }
}




// Pagination

// nextBtn.addEventListener('click', () => loadExpenses(++offset));

// prevBtn.addEventListener('click', () => loadExpenses(--offset));




// Managing form Events

let editId = null;
form.addEventListener('submit', onSubmit);
async function onSubmit(e) {
    try {
        e.preventDefault();
        
        const expense = {
            amount : parseInt(amount.value),
            category : category.value,
            description : des.value,
        }
    
        if(editId) {
            url = `${api}/edit?expenseId=${editId}`;
            editId = null;
        } else url = `${api}/add`;
    
        const { data } = await axios.post(url, expense);
        
        addExpense(data);
        
        amount.value = '';
        des.value = '';   
    } catch (error) {
        handelErrors(error);
    }
}




// Manage list events

list.addEventListener('click', listEvent);
function listEvent(e) {
    if(e.target.classList.contains('delete')) dlt(e.target.parentElement);
    if(e.target.classList.contains('edit')) edit(e.target.parentElement);
}




// Delete Expense

async function dlt(li) {
    const id = li.getAttribute('data-id');
    try {
        li.style.display = 'none';
        await axios.delete(`${api}/delete?expenseId=${id}`);
    } catch (error) {
        handelErrors(error);
    }
}




// Edit Expense 

async function edit(li) { 
    editId = li.getAttribute('data-id');
    category.value = li.children[0].textContent;
    amount.value = li.children[2].textContent;
    des.value = li.children[5].textContent;
    li.style.display = 'none';
}




// View Report

viewReportBtn.addEventListener('click', e => window.location.href = 'report.html');




// Utility functions


async function loadExpenses(offset) {
    try {
        const { data: { expense, totalPages } } = await axios.get(api) 
        // + `?offset=${offset}&limit=${limit}`;
    
        // if(offset) nextBtn.style.display = 'inline-block';
        // else nextBtn.style.display = 'none';
    
        // if(offset < totalPages) prevBtn.style.display = 'inline-block';
        // else prevBtn.style.display = 'none';
    
        expense.forEach(x => addExpense(x));       
    } catch (error) {
        handelErrors(error);
    }
}


async function loadPremiumFeatures() {
    try {
        premiumBtn.style.display = 'none';
        const leaderboardUi = addElement('div', document.body);
        leaderboardUi.innerHTML =
        ` <div class="container mt-5">
              <h2 class="mb-4">Leaderboard</h2>
              <table class="table table-bordered table-striped">
                  <thead>
                      <tr>
                          <th>Rank</th>
                          <th>Name</th>
                          <th>Expense</th>
                      </tr>
                  </thead>
                  <tbody id="leaderboard-body"></tbody>
              </table>
          </div>
        `
        const leaderBoardBody = document.querySelector('#leaderboard-body');
        const { data } = await axios.get('http://localhost:4000/premium/features/leaderboard');
        const {isPremium, leaderBoard} = data;
        if(isPremium) {
            let count = 0;
            leaderBoard.forEach(user => {
               const row = addElement('tr', leaderBoardBody);
               const rank = addElement('td', row, ++count);
               const name = addElement('td', row, user.username);
               const expense = addElement('td', row, user.expense);
            })
        }
    } catch (error) {
        handelErrors(error);
    }
}


function addExpense(obj) {
    const li = addElement('li', list, null, 'list-group-item');
    li.setAttribute('data-id', obj.id);
    const cat = addElement('span', li, obj.category);
    const spc =  addElement('span', li, "  ");
    const amt =  addElement('span', li, obj.amount);
    const edit = addElement('button', li, 'Edit', 'btn', 'btn-sm', 'float-right', 'btn-warning', 'ml-2', 'edit');
    const dlt = addElement('button', li, 'X', 'btn-danger',  'btn-sm', 'float-right', 'delete');
    const des = addElement('small', li, obj.description, 'd-block', 'text-muted', 'mt-1');
}


function addElement(type, parent, text, ...classes) {
    const element = document.createElement(type);
    classes.forEach(c => element.classList.add(c));
    if(text !== null) element.textContent = text;
    parent.append(element);
    return element;
}


function handelErrors(error) {
    if(error.response.data) console.log(error.response.data.message);
    else console.log(error);
}