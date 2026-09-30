const test = require('node:test');
const assert = require('node:assert');
const { formatMoney } = require('../src/report');

test('formats known currencies', () => {
  assert.strictEqual(formatMoney(1500, 'LKR'), 'Rs. 1500.00');
  assert.strictEqual(formatMoney(12.5, 'USD'), '$12.50');
  assert.strictEqual(formatMoney(12.5, 'EUR'), '12.50 EUR');
  assert.strictEqual(formatMoney(1200.4, 'JPY'), '1200 JPY');
});

test('falls back to a plain number for other currencies', () => {
  assert.strictEqual(formatMoney(3, 'XYZ'), '3.00');
  assert.strictEqual(formatMoney(3, 'constructor'), '3.00');
});
