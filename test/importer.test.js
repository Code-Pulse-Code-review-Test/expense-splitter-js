const test = require('node:test');
const assert = require('node:assert');
const Group = require('../src/group');
const { parseExpenses, parseMembers, parseMembersCsv } = require('../src/importer');

function tripGroup() {
  const g = new Group('trip');
  parseMembers(g, 'Kasun\nNimali\nTharindu\n');
  return g;
}

test('adds members and skips blanks and repeats', () => {
  const g = new Group('trip');
  assert.strictEqual(parseMembers(g, 'Kasun\n\nNimali\nKasun\n'), 2);
  assert.deepStrictEqual(g.members, ['Kasun', 'Nimali']);
});

test('reads member names from the first csv column', () => {
  const g = new Group('trip');
  assert.strictEqual(parseMembersCsv(g, 'Kasun,0771234567\nNimali,0719876543'), 2);
  assert.deepStrictEqual(g.members, ['Kasun', 'Nimali']);
});

test('splits an expense between everyone when no people are listed', () => {
  const g = tripGroup();
  assert.strictEqual(parseExpenses(g, 'Hotel,18000,Nimali'), 1);
  assert.deepStrictEqual(g.expenses[0].splitBetween, ['Kasun', 'Nimali', 'Tharindu']);
});

test('splits an expense between the listed people', () => {
  const g = tripGroup();
  parseExpenses(g, 'Dinner,6000,Tharindu,Kasun|Tharindu\r\n');
  assert.deepStrictEqual(g.expenses[0].splitBetween, ['Kasun', 'Tharindu']);
});

test('skips bad lines and keeps the good ones', () => {
  const g = tripGroup();
  const text = [
    'Taxi,abc,Kasun',
    'Lunch,900,Amal',
    'Snacks,300,Kasun,Kasun|Amal',
    'Tea',
    'Bus,450,Kasun',
  ].join('\n');
  assert.strictEqual(parseExpenses(g, text), 1);
  assert.strictEqual(g.expenses[0].description, 'Bus');
});
