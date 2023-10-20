// Selecting elements

const form = document.querySelector('#add-form');
const amount = document.querySelector('#form-amount');
const category = document.querySelector('#form-category');
const des = document.querySelector('#form-des');
const list = document.querySelector('#list');

const api = 'http://localhost:4000/expense'
const query = `?token=${localStorage.getItem('token')}`



//on refresh

window.addEventListener('DOMContentLoaded', onRefresh);
async function onRefresh() {
    const { data } = await axios.get(api + query);
    data.forEach(x => addExpense(x));
}




// Managing form Events

let editId = null;
form.addEventListener('submit', onSubmit);
async function onSubmit(e) {
    e.preventDefault();
    const expense = {
        amount : amount.value,
        category : category.value,
        description : des.value,
    }
    try {
        if(editId) {
            url = `${api}/edit${query}&expenseId=${editId}`;
            editId = null;
        } else url = `${api}/add${query}`;
        const { data } = await axios.post(url, expense);
        addExpense(data);
    } catch(error) {
        console.log(err);
    }
    amount.value = '';
    des.value = '';
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
    li.style.display = 'none';
    await axios.delete(`${api}/delete${query}&expenseId=${id}`);
}




// Edit Expense 

async function edit(li) { 
    editId = li.getAttribute('data-id');
    category.value = li.children[0].textContent;
    amount.value = li.children[2].textContent;
    des.value = li.children[5].textContent;
    li.style.display = 'none';
}




// Utility functions

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
    if(text) element.textContent = text;
    parent.append(element);
    return element;
}