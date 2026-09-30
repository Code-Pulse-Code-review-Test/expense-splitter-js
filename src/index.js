const fs = require('fs');
const Group = require('./group');
const { settleUp } = require('./balances');
const { parseExpenses, parseMembers } = require('./importer');
const { printBalances, printExpenses, formatMoney } = require('./report');

// optional currency code, e.g. node src/index.js USD
const currency = (process.argv[2] || 'LKR').toUpperCase();

const trip = new Group('Ella trip');
parseMembers(trip, fs.readFileSync('data/members.txt', 'utf8'));
parseExpenses(trip, fs.readFileSync('data/expenses.csv', 'utf8'));

printExpenses(trip, currency);
printBalances(trip, currency);

console.log('\nPayments to settle up:');
for (const p of settleUp(trip)) {
  console.log(p.from + ' pays ' + p.to + ' ' + formatMoney(p.amount, currency));
}
