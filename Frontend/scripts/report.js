// Selecting elements

const dailyReportBtn = document.getElementById('daily-report');
const weeklyReportBtn = document.getElementById('weekly-report');
const monthlyReportBtn = document.getElementById('monthly-report');
const yearlyReportBtn = document.getElementById('yearly-report');
const tableBody = document.getElementById('expense-list');
const premiumBtn = document.getElementById('premium-btn');
const downloadBtn = document.getElementById('download-btn');



// Event Listeners

dailyReportBtn.addEventListener('click', () => fetchReport('daily'));
weeklyReportBtn.addEventListener('click', () => fetchReport('weekly'));
monthlyReportBtn.addEventListener('click', () => fetchReport('monthly'));
yearlyReportBtn.addEventListener('click', () => fetchReport('yearly'));



// On Refresh

window.addEventListener('DOMContentLoaded', onRefresh);
async function onRefresh() {
    downloadBtn.style.display = 'none';

    const { data } = await axios.get('http://localhost:4000/');
    const {isPremium, expense} = data;
    
    populateTable(expense);
    
    if(isPremium) {
        premiumBtn.style.display = 'none';
        downloadBtn.style.display = 'inline-block';
    }
}



function fetchReport(timeframe) {
    
    let reportData = [];

    switch(timeframe) {
        case 'daily':
           
            break;
        case 'weekly':
            
            break;
        case 'monthly':
            
            break;
        case 'yearly':
            
            break;
    }

    populateTable(reportData);
}

function populateTable(data) {
    
    tableBody.innerHTML = '';

    data.forEach(expense => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.amount}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
        `;
        tableBody.appendChild(row);
    });
}