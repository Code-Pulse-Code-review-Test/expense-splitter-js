const test = require('node:test');
const assert = require('node:assert');
const Group = require('../src/group');
const { formatMoney } = require('../src/report');
const { parseMembers, parseMembersCsv } = require('../src/importer');

test('formats money for known and unknown currencies', () => {
  assert.strictEqual(formatMoney(1500, 'LKR'), 'Rs. 1500.00');
  assert.strictEqual(formatMoney(12.5, 'EUR'), '12.50 EUR');
  assert.strictEqual(formatMoney(300, 'JPY'), '300 JPY');
  assert.strictEqual(formatMoney(7, 'XYZ'), '7.00');
});

test('both member formats skip blanks and duplicates', () => {
  const g = new Group('test');
  assert.strictEqual(parseMembers(g, 'a\n\nb\na\n'), 2);
  assert.strictEqual(parseMembersCsv(g, 'c,0771234567\nb,0779999999\n'), 1);
  assert.deepStrictEqual(g.members, ['a', 'b', 'c']);
});
