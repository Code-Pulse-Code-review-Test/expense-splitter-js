const { getBalances } = require('./balances');

function formatMoney(amount, currency) {
  if (currency == 'LKR') {
    return 'Rs. ' + amount.toFixed(2);
  } else if (currency == 'USD') {
    return '$' + amount.toFixed(2);
  } else if (currency == 'EUR') {
    return amount.toFixed(2) + ' EUR';
  } else if (currency == 'GBP') {
    return 'GBP ' + amount.toFixed(2);
  } else if (currency == 'INR') {
    return 'Rs ' + amount.toFixed(2);
  } else if (currency == 'JPY') {
    return amount.toFixed(0) + ' JPY';
  } else if (currency == 'AUD') {
    return 'A$' + amount.toFixed(2);
  } else if (currency == 'CAD') {
    return 'C$' + amount.toFixed(2);
  } else if (currency == 'SGD') {
    return 'S$' + amount.toFixed(2);
  } else if (currency == 'NZD') {
    return 'NZ$' + amount.toFixed(2);
  } else {
    return amount.toFixed(2);
  }
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
  let lineCount = 0;
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
