// reads lines like: Hotel,18000,Nimali,Kasun|Nimali
function parseExpenses(group, text) {
  const lines = text.split('\n');
  let added = 0;

  for (const line of lines) {
    if (line.trim() !== '') {
      const parts = line.split(',');
      if (parts.length >= 3) {
        const amount = parseFloat(parts[1]);
        if (!isNaN(amount)) {
          if (group.members.includes(parts[2].trim())) {
            if (parts[3]) {
              const people = parts[3].split('|').map((p) => p.trim());
              if (people.every((p) => group.members.includes(p))) {
                group.addExpense(parts[0].trim(), amount, parts[2].trim(), people);
                added++;
              } else {
                console.log('Skipping line, unknown person in: ' + line);
              }
            } else {
              group.addExpense(parts[0].trim(), amount, parts[2].trim());
              added++;
            }
          } else {
            console.log('Skipping line, unknown payer: ' + line);
          }
        } else {
          console.log('Skipping line, bad amount: ' + line);
        }
      } else {
        console.log('Skipping line, not enough columns: ' + line);
      }
    }
  }

  return added;
}

function parseMembers(group, text) {
  const names = text.split('\n');
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

function parseMembersCsv(group, text) {
  const names = text.split('\n').map((line) => line.split(',')[0]);
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

function toCsv(group) {
  const rows = [];
  for (const e of group.expenses) {
    rows.push([e.description, e.amount, e.paidBy, e.splitBetween.join('|')].join(','));
  }
  return rows.join('\n');
}

module.exports = { parseExpenses, parseMembers, parseMembersCsv, toCsv };
