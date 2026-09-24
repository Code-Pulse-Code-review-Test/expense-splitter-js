class Group {
  constructor(name) {
    this.name = name;
    this.members = [];
    this.expenses = [];
  }

  addMember(name) {
    if (this.members.includes(name)) {
      throw new Error(name + ' is already in the group');
    }
    this.members.push(name);
  }

  addExpense(description, amount, paidBy, splitBetween) {
    if (!this.members.includes(paidBy)) {
      throw new Error(paidBy + ' is not in the group');
    }
    if (amount <= 0) {
      throw new Error('amount must be positive');
    }
    const people = splitBetween || this.members;
    this.expenses.push({ description, amount, paidBy, splitBetween: people, date: new Date() });
  }

  total() {
    let sum = 0;
    for (const e of this.expenses) {
      sum += e.amount;
    }
    return sum;
  }
}

module.exports = Group;
