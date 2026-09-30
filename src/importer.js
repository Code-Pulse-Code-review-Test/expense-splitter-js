// reads a line like: Hotel,18000,Nimali,Kasun|Nimali
// returns why the line was skipped, or null once the expense is added
function addExpenseLine(group, line) {
  const parts = line.split(',').map((p) => p.trim());
  if (parts.length < 3) {
    return 'not enough columns';
  }

  const [description, rawAmount, paidBy, splitColumn] = parts;
  const amount = parseFloat(rawAmount);
  if (isNaN(amount)) {
    return 'bad amount';
  }
  if (!group.members.includes(paidBy)) {
    return 'unknown payer';
  }

  const people = splitColumn ? splitColumn.split('|').map((p) => p.trim()) : undefined;
  if (people && !people.every((p) => group.members.includes(p))) {
    return 'unknown person';
  }

  group.addExpense(description, amount, paidBy, people);
  return null;
}

function parseExpenses(group, text) {
  let added = 0;

  for (const line of text.split('\n')) {
    if (line.trim() === '') {
      continue;
    }
    const problem = addExpenseLine(group, line);
    if (problem) {
      console.log('Skipping line, ' + problem + ': ' + line);
    } else {
      added++;
    }
  }

  return added;
}

function addMembers(group, names) {
  let added = 0;
  let skipped = 0;

  for (const raw of names) {
    const name = raw.trim();
    if (name === '') {
      continue;
    }
    if (group.members.includes(name)) {
      console.log('Already in group: ' + name);
      skipped++;
      continue;
    }
    group.addMember(name);
    added++;
  }

  console.log('Added ' + added + ' members, skipped ' + skipped);
  return added;
}

function parseMembers(group, text) {
  return addMembers(group, text.split('\n'));
}

// the name is the first column
function parseMembersCsv(group, text) {
  return addMembers(
    group,
    text.split('\n').map((line) => line.split(',')[0]),
  );
}

function toCsv(group) {
  const rows = [];
  for (const e of group.expenses) {
    rows.push([e.description, e.amount, e.paidBy, e.splitBetween.join('|')].join(','));
  }
  return rows.join('\n');
}

module.exports = { parseExpenses, parseMembers, parseMembersCsv, toCsv };
