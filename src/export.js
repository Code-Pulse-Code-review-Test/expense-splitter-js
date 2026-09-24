const fs = require('fs');
const { exec } = require('child_process');
const { getBalances } = require('./balances');

function exportReport(group, fileName, format, includeBalances, openAfter) {
  let out = '';
  if (format === 'csv') {
    out = 'description,amount,paidBy,splitBetween\n';
    for (const e of group.expenses) {
      out += e.description + ',' + e.amount + ',' + e.paidBy + ',' + e.splitBetween.join('|') + '\n';
    }
    if (includeBalances) {
      out += '\nname,balance\n';
      for (const [name, value] of getBalances(group)) {
        out += name + ',' + value.toFixed(2) + '\n';
      }
    }
  } else if (format === 'txt') {
    for (const e of group.expenses) {
      if (e.amount > 10000) {
        out += '* ' + e.description + ' ' + e.amount + ' (' + e.paidBy + ')\n';
      } else if (e.amount > 0) {
        out += '  ' + e.description + ' ' + e.amount + ' (' + e.paidBy + ')\n';
      } else {
        out += '  ' + e.description + ' free\n';
      }
    }
    if (includeBalances) {
      for (const [name, value] of getBalances(group)) {
        if (value > 0) {
          out += name + ' gets ' + value.toFixed(2) + '\n';
        } else if (value < 0) {
          out += name + ' owes ' + (-value).toFixed(2) + '\n';
        }
      }
    }
  } else {
    throw new Error('unknown format ' + format);
  }

  const path = 'exports/' + fileName;
  fs.writeFileSync(path, out);
  if (openAfter) {
    exec('xdg-open ' + path);
  }
  return path;
}

module.exports = { exportReport };
