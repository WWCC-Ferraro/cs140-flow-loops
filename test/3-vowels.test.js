// Part 3 — firstVowelAt
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { answer, show } from '../support/call.js';

const file = new URL('../src/vowels.js', import.meta.url);

function whatWentWrong(word, got, expected, lastVowel) {
  if (typeof got !== 'number') return 'It should return a number: an index, or -1.';
  if (expected === -1) return `"${word}" has no vowel, so the answer is -1. Note that "y" is not a vowel here.`;
  if (word[expected] !== word[expected].toLowerCase()) {
    return `The first vowel, "${word[expected]}", is a capital. Capitals count as vowels too. See "Working with strings".`;
  }
  if (got === -1 && expected === word.length - 1) {
    return `The vowel is the last character, at index ${expected}. Check that the loop reaches the last index, length - 1. An off-by-one. See "The for loop".`;
  }
  if (got === expected + 1) return 'That is one more than the index: an off-by-one. Indexes count from 0, so the first character is at index 0.';
  if (got === lastVowel) return 'That is the index of the LAST vowel: the loop kept going after it found the first. See "Leaving a loop early: break and continue".';
  return 'Go through the indexes from 0, and stop at the first character that is a vowel. See "Leaving a loop early: break and continue".';
}

// `lastVowel` is the index of the word's last vowel, where it has more than one.
async function check(word, expected, lastVowel) {
  const got = await answer(file, 'firstVowelAt', [word],
    `When ${show(word)} has no vowel, the loop finishes without finding one — and that path needs a return too: the comment says what to return.`);
  if (got !== expected) {
    assert.fail(`firstVowelAt(${show(word)}) should be ${expected}, but it returned ${got}. ${whatWentWrong(word, got, expected, lastVowel)}`);
  }
}

test('finds a vowel in the middle of a word', async () => {
  await check('Grace', 2, 4);
  await check('strength', 3);
});

test('a vowel at index 0 is found', async () => {
  await check('apple', 0, 4);
  await check('oak', 0);
});

test('gives the first vowel, not the last', async () => {
  await check('banana', 1, 5);
  await check('Petra', 1, 4);
});

test('capitals count as vowels', async () => {
  await check('Ingrid', 0);
  await check('STOP', 2);
});

test('a vowel in the last place is found', async () => {
  await check('spa', 2);
  await check('shh-a', 4);
});

test('-1 when there is no vowel', async () => {
  await check('Lynn', -1);
  await check('rhythm', -1);
  await check('', -1);
});
