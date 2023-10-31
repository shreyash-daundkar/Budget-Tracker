// Selecting elements

const dailyReportBtn = document.getElementById('daily-report');
const weeklyReportBtn = document.getElementById('weekly-report');
const monthlyReportBtn = document.getElementById('monthly-report');
const yearlyReportBtn = document.getElementById('yearly-report');
const tableBody = document.getElementById('expense-list');
const premiumBtn = document.getElementById('premium-btn');
const downloadBtn = document.getElementById('download-btn');
const downloadHistoryBtn = document.getElementById('download-history-btn');

const token = localStorage.getItem('token');
axios.defaults.headers.common['authorization'] = token;




// On Refresh

window.addEventListener('DOMContentLoaded', onRefresh);
async function onRefresh() {
    try {
        downloadBtn.style.display = 'none';
        downloadHistoryBtn.style.display = 'none';

        const { data } = await axios.get('http://localhost:4000/expense');
        const {isPremium, expense} = data;
        
        populateTable(expense);
        
        if(isPremium) {
            premiumBtn.style.display = 'none';
            downloadBtn.style.display = 'inline-block';
            downloadHistoryBtn.style.display = 'inline-block';
        }
    } catch (error) {
        handelErrors(error);
    }
}




// On Download

downloadBtn.addEventListener('click', downloadReport);

async function downloadReport() { 
    try {
        const { data } = await axios.get('http://localhost:4000/premium/features/download-report');
        downloadFile(data.location);
    } catch (error) {
        handelErrors(error);
    }
}


function downloadFile(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = true;
    a.click();
}



//  Time Frames Filter

dailyReportBtn.addEventListener('click', () => fetchReport('daily'));
weeklyReportBtn.addEventListener('click', () => fetchReport('weekly'));
monthlyReportBtn.addEventListener('click', () => fetchReport('monthly'));
yearlyReportBtn.addEventListener('click', () => fetchReport('yearly'));


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




// Utility Function 

function populateTable(data) {
    
    tableBody.innerHTML = '';

    data.forEach(expense => {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.amount}</td>
        <td>${expense.category}</td>
        <td>${expense.description}</td>
        `;
        tableBody.appendChild(row);
    });
}

function handelErrors(error) {
    if(error.response.data) console.log(error.response.data.message);
    else console.log(error);
}