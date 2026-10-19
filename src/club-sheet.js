// The club sheet. You do not need to change anything in this file.
//
// It prints a lifting club's weekly sheet, and each section of it is worked
// out by one of the functions you are writing. Run it whenever you like:
//
//   npm start
//
// Before you finish a function, its section shows `undefined` — what a
// function returns when it has no `return` yet. Finish the function, run
// the sheet again, and that section comes right.
//
// The `import` lines bring in the functions you write in the other four files.

import { totalReps } from './reps.js';
import { yearsToGoal } from './savings.js';
import { firstVowelAt } from './vowels.js';
import { kgTable } from './weights.js';

// ─── This week ─────────────────────────────────────────────────────────────

const clubName = 'Riverside Lifting Club';
const repLog = '||||| ||||| ||||| |||| |||';   // the whiteboard: | per rep, a space between sets

const lightestDumbbell = 2;     // kilograms
const heaviestDumbbell = 20;
const dumbbellStep = 2;

const savings = 1200;           // dollars in the club's account
const interestRate = 4;         // percent a year
const rackPrice = 1500;

// ─── Locker tags ───────────────────────────────────────────────────────────
// A tag is the member's name up to and including its first vowel, in
// capitals. A name with no vowel (firstVowelAt gives -1) is used whole.

const graceAt = firstVowelAt('Grace');
const graceTag = (graceAt === -1 ? 'Grace' : 'Grace'.slice(0, graceAt + 1)).toUpperCase();

const ingridAt = firstVowelAt('Ingrid');
const ingridTag = (ingridAt === -1 ? 'Ingrid' : 'Ingrid'.slice(0, ingridAt + 1)).toUpperCase();

const lynnAt = firstVowelAt('Lynn');
const lynnTag = (lynnAt === -1 ? 'Lynn' : 'Lynn'.slice(0, lynnAt + 1)).toUpperCase();

// ─── The sheet ─────────────────────────────────────────────────────────────

console.log(`=== ${clubName} · weekly sheet ===`);
console.log('');
console.log(`The whiteboard: ${repLog}`);
console.log(`Reps logged this week: ${totalReps(repLog)}`);
console.log('');
console.log('The dumbbell rack, in kilograms and pounds:');
console.log(kgTable(lightestDumbbell, heaviestDumbbell, dumbbellStep));
console.log('');
console.log(`The squat rack fund: $${savings} saved at ${interestRate}% a year, for a $${rackPrice} rack.`);
console.log(`Years until we can buy it: ${yearsToGoal(savings, interestRate, rackPrice)}`);
console.log('');
console.log('New members, and their locker tags:');
console.log(`Grace: first vowel at index ${graceAt}, tag ${graceTag}`);
console.log(`Ingrid: first vowel at index ${ingridAt}, tag ${ingridTag}`);
console.log(`Lynn: first vowel at index ${lynnAt}, tag ${lynnTag}`);
