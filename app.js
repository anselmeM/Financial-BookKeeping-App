// A Transaction class with a constructor that hold all inputs for a bookkeeping app.
class Transaction {
  constructor(date, description, category, amount) {
    this.date = date;
    this.description = description;
    this.category = category;
    this.amount = amount;
  }
}

class BookkeepingApp {
  constructor() {
    this.transactions = [];
    this.transactionForm = document.getElementById("transaction-form");
    this.transactionTable = document.getElementById("transaction-table");
    this.balanceForm = document.getElementById("balance");
    this.errorMessage = document.getElementById("error-message");
    this.successMessage = document.getElementById("success-message");

    this.dateInput = document.getElementById("date");
    this.descriptionInput = document.getElementById("description");
    this.categoryInput = document.getElementById("category");
    this.amountInput = document.getElementById("amount");

    this.transactionForm.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const date = this.dateInput.value;
    const description = this.descriptionInput.value;
    const category = this.categoryInput.value;
    const amount = parseFloat(this.amountInput.value);

    try {
      this.validateInput(date, description, category, amount);

      const transaction = new Transaction(date, description, category, amount);
      this.addTransaction(transaction);

      this.clearFormInputs();
      this.displaySuccessMessage("Transaction added successfully.");
    } catch (error) {
      console.error("An error occurred:", error.message);
      this.displayErrorMessage("An error occurred. Please check your inputs.");
    }
  }

  validateInput(date, description, category, amount) {
    if (!this.isValidDate(date)) {
      throw new Error("Please enter a valid date in the format YYYY-MM-DD.");
    }
    if (!this.isValidField(description)) {
      throw new Error("Please enter a description.");
    }
    if (!this.isValidField(category)) {
      throw new Error("Please enter a category.");
    }
    if (!this.isValidAmount(amount)) {
      throw new Error("Please enter a valid amount.");
    }
  }

  isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  }

  isValidField(value) {
    return value !== "";
  }

  isValidAmount(amount) {
    return !isNaN(amount) && amount !== 0;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
    this.renderTransaction(transaction);
    this.updateBalance();
  }

  renderTransaction(transaction) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="transaction-date">${transaction.date}</td>
      <td class="transaction-description">${transaction.description}</td>
      <td class="transaction-category">${transaction.category}</td>
      <td class="${transaction.amount >= 0 ? "transaction-income" : "transaction-expense"}">${transaction.amount}</td>
    `;
    this.transactionTable.appendChild(row);
  }

  updateBalance() {
    let totalBalance = 0;
    for (const transaction of this.transactions) {
      totalBalance += transaction.amount;
    }
    this.balanceForm.textContent = `Total Balance: $${totalBalance}`;
  }

  clearFormInputs() {
    this.dateInput.value = "";
    this.descriptionInput.value = "";
    this.categoryInput.value = "";
    this.amountInput.value = "";
  }

  displayErrorMessage(message) {
    this.errorMessage.textContent = message;
    this.successMessage.textContent = "";
    setTimeout(() => {
      this.errorMessage.textContent = "";
    }, 5000);
  }

  displaySuccessMessage(message) {
    this.successMessage.textContent = message;
    setTimeout(() => {
      this.successMessage.textContent = "";
    }, 5000);
  }
}

const bookkeepingApp = new BookkeepingApp();
