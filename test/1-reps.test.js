// Part 1 — totalReps
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { answer, show } from '../support/call.js';

const file = new URL('../src/reps.js', import.meta.url);

/* What a wrong count most likely did, worked out from what came back. */
function whatWentWrong(log, got, expected) {
  if (typeof got !== 'number') return 'It should return a number: how many reps.';
  const spaces = log.split(' ').length - 1;
  if (got === log.length && spaces > 0) return `That is every character in the log, the ${spaces} space${spaces === 1 ? '' : 's'} too. Count only the | characters.`;
  if (got === 0 && expected > 0) return 'It counted nothing. If you wrote log[ch]: ch already is the character, so log[ch] asks for a position called "|", which a string does not have. Compare ch itself. See "The for…of loop".';
  if (got === spaces) return 'That is the number of spaces. Count the | characters instead.';
  if (got === expected + 1) return 'One too many. Does the count start at 0 before the loop?';
  if (got === expected - 1) return 'One too few. Does the loop look at every character, the last one too?';
  return 'Take each character in turn, and add one to the count when it is a |. See "The for…of loop".';
}

async function check(log, expected) {
  const got = await answer(file, 'totalReps', [log],
    `totalReps(${show(log)}) needs to return the count once the loop has finished.`);
  if (got !== expected) {
    assert.fail(`totalReps(${show(log)}) should be ${expected}, but it returned ${got}. ${whatWentWrong(log, got, expected)}`);
  }
}

test('one set: every character is a rep', async () => {
  await check('|||', 3);
  await check('|', 1);
});

test('the spaces between sets are not reps', async () => {
  await check('||||| |||| |||', 12);
  await check('| | |', 3);
  await check('|||||||||| ||||||||||', 20);
});

test('an empty log is 0 reps', async () => {
  await check('', 0);
});
