const { getBalances } = require('./balances');

const CURRENCIES = {
  LKR: { prefix: 'Rs. ' },
  USD: { prefix: '$' },
  EUR: { suffix: ' EUR' },
  GBP: { prefix: 'GBP ' },
  INR: { prefix: 'Rs ' },
  JPY: { suffix: ' JPY', decimals: 0 },
  AUD: { prefix: 'A$' },
  CAD: { prefix: 'C$' },
  SGD: { prefix: 'S$' },
  NZD: { prefix: 'NZ$' },
};

function formatMoney(amount, currency) {
  const c = CURRENCIES[currency] || {};
  const decimals = c.decimals === undefined ? 2 : c.decimals;
  return (c.prefix || '') + amount.toFixed(decimals) + (c.suffix || '');
}

// TODO: let the user pick the currency
function printBalances(group) {
  const balances = getBalances(group);
  const currency = 'LKR';
  console.log('Balances for ' + group.name);
  console.log('----------------------------');
  for (const [name, value] of balances) {
    if (value > 0) {
      console.log(name + ' gets back ' + formatMoney(value, currency));
    } else if (value < 0) {
      console.log(name + ' owes ' + formatMoney(-value, currency));
    } else {
      console.log(name + ' is settled');
    }
  }
  console.log('----------------------------');
}

function printExpenses(group) {
  const currency = 'LKR';
  console.log('Expenses for ' + group.name);
  console.log('----------------------------');
  for (const e of group.expenses) {
    console.log(e.description + ' paid by ' + e.paidBy + ' ' + formatMoney(e.amount, currency));
  }
  console.log('----------------------------');
}

function printMemberExpenses(group, member) {
  const currency = 'LKR';
  console.log('Expenses for ' + group.name);
  console.log('----------------------------');
  for (const e of group.expenses) {
    if (e.paidBy !== member) continue;
    console.log(e.description + ' paid by ' + e.paidBy + ' ' + formatMoney(e.amount, currency));
  }
  console.log('----------------------------');
}

module.exports = { formatMoney, printBalances, printExpenses, printMemberExpenses };
