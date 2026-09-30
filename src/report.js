const { getBalances } = require('./balances');

const LINE = '----------------------------';

const CURRENCIES = {
  LKR: { prefix: 'Rs. ', suffix: '', decimals: 2 },
  USD: { prefix: '$', suffix: '', decimals: 2 },
  EUR: { prefix: '', suffix: ' EUR', decimals: 2 },
  GBP: { prefix: 'GBP ', suffix: '', decimals: 2 },
  INR: { prefix: 'Rs ', suffix: '', decimals: 2 },
  JPY: { prefix: '', suffix: ' JPY', decimals: 0 },
  AUD: { prefix: 'A$', suffix: '', decimals: 2 },
  CAD: { prefix: 'C$', suffix: '', decimals: 2 },
  SGD: { prefix: 'S$', suffix: '', decimals: 2 },
  NZD: { prefix: 'NZ$', suffix: '', decimals: 2 },
};

function formatMoney(amount, currency) {
  if (!Object.hasOwn(CURRENCIES, currency)) {
    return amount.toFixed(2);
  }
  const format = CURRENCIES[currency];
  return format.prefix + amount.toFixed(format.decimals) + format.suffix;
}

function printBalances(group, currency = 'LKR') {
  console.log('Balances for ' + group.name);
  console.log(LINE);
  for (const [name, value] of getBalances(group)) {
    if (value > 0) {
      console.log(name + ' gets back ' + formatMoney(value, currency));
    } else if (value < 0) {
      console.log(name + ' owes ' + formatMoney(-value, currency));
    } else {
      console.log(name + ' is settled');
    }
  }
  console.log(LINE);
}

function printExpenseList(group, expenses, currency) {
  console.log('Expenses for ' + group.name);
  console.log(LINE);
  for (const e of expenses) {
    console.log(e.description + ' paid by ' + e.paidBy + ' ' + formatMoney(e.amount, currency));
  }
  console.log(LINE);
}

function printExpenses(group, currency = 'LKR') {
  printExpenseList(group, group.expenses, currency);
}

function printMemberExpenses(group, member, currency = 'LKR') {
  printExpenseList(
    group,
    group.expenses.filter((e) => e.paidBy === member),
    currency,
  );
}

module.exports = { formatMoney, printBalances, printExpenses, printMemberExpenses };
