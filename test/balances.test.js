const test = require('node:test');
const assert = require('node:assert');
const Group = require('../src/group');
const { getBalances, settleUp } = require('../src/balances');

test('balances add up to zero', () => {
  const g = new Group('test');
  g.addMember('a');
  g.addMember('b');
  g.addExpense('lunch', 1000, 'a');
  const b = getBalances(g);
  assert.strictEqual(b.get('a') + b.get('b'), 0);
  assert.strictEqual(b.get('a'), 500);
});

test('settle up gives one payment for two people', () => {
  const g = new Group('test');
  g.addMember('a');
  g.addMember('b');
  g.addExpense('taxi', 300, 'b');
  assert.deepStrictEqual(settleUp(g), [{ from: 'a', to: 'b', amount: 150 }]);
});
