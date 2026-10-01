function getBalances(group) {
  const balances = new Map();
  for (const m of group.members) {
    balances.set(m, 0);
  }

  for (const e of group.expenses) {
    const share = e.amount / e.splitBetween.length;
    balances.set(e.paidBy, balances.get(e.paidBy) + e.amount);
    for (const p of e.splitBetween) {
      balances.set(p, balances.get(p) - share);
    }
  }

  return balances;
}

// works out the payments so everyone ends up even
function settleUp(group) {
  const balances = getBalances(group);
  const debtors = [];
  const creditors = [];

  for (const [name, value] of balances) {
    const amount = Math.round(value * 100) / 100;
    if (amount < 0) {
      debtors.push({ name, amount: -amount });
    } else if (amount > 0) {
      creditors.push({ name, amount });
    }
  }

  const payments = [];
  while (debtors.length && creditors.length) {
    const debtor = debtors[0];
    const creditor = creditors[0];
    const pay = Math.min(debtor.amount, creditor.amount);
    payments.push({ from: debtor.name, to: creditor.name, amount: pay });
    debtor.amount -= pay;
    creditor.amount -= pay;
    if (debtor.amount < 0.01) {
      debtors.shift();
    }
    if (creditor.amount < 0.01) {
      creditors.shift();
    }
  }

  return payments;
}

module.exports = { getBalances, settleUp };
