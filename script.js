document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name-input');
    const expenseAmountInput = document.getElementById('expense-amount-input');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');
    

    let expenses = [];
    let totalAmount = calculateTotal();


    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseInt(expenseAmountInput.value);

        if(name !== '' && !isNaN(amount) && amount > 0){ // if all 3 conditions are met, create an expense 
            const newExpense = {
                name,
                amount
            }

            expenses.push(newExpense); // add to the array
            saveExpensesToLocalStorage(); // save to local storage
            updateTotal(); // update in the browser 

            // clear input after submit something 
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
            
        }

    })
    function calculateTotal(){ // calculating the total of every expense's amount
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    function saveExpensesToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));  // if you refresh the page, it will not lose the content
    }

    function renderExpenseList() {
         
    }

    function updateTotal(){
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount;
    }
})

