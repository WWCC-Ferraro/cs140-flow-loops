// Part 2 — yearsToGoal
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { answer } from '../support/call.js';

const file = new URL('../src/savings.js', import.meta.url);

function whatWentWrong(got, expected) {
  if (typeof got !== 'number') return 'It should return a number: how many years.';
  if (expected === 0) return 'The savings already reach the goal, so no years are needed. A while loop checks its condition before its first iteration, so it can run zero times. See "The while loop".';
  if (got === expected + 1) return 'That is one year late: an off-by-one. Check when your loop stops — the goal is reached as soon as the savings are equal to it, not only once they pass it.';
  if (got === expected - 1) return 'That is one year early: an off-by-one. Check that you count a year for every iteration that adds interest, and that the loop keeps going while the savings are still short of the goal.';
  return 'Each iteration of the loop is one year: add that year\'s interest, and count the year. See "The while loop".';
}

async function check(savings, rate, goal, expected) {
  const call = `yearsToGoal(${savings}, ${rate}, ${goal})`;
  const got = await answer(file, 'yearsToGoal', [savings, rate, goal],
    `${call} needs to return the count of years once the loop has finished.`);
  if (got !== expected) {
    assert.fail(`${call} should be ${expected}, but it returned ${got}. ${whatWentWrong(got, expected)}`);
  }
}

test('0 years when the savings already reach the goal', async () => {
  await check(500, 5, 500, 0);
  await check(600, 5, 500, 0);
});

test('landing exactly on the goal counts as reaching it', async () => {
  await check(1000, 10, 1331, 3);   // 1100, 1210, 1331
  await check(100, 10, 121, 2);     // 110, 121
});

test('counts every year until the goal is passed', async () => {
  await check(1000, 5, 2000, 15);
  await check(1200, 4, 1500, 6);
  await check(800, 25, 1250, 2);    // 1000, 1250 — reached exactly
});

test('one year is enough when one year of interest reaches the goal', async () => {
  await check(1000, 5, 1020, 1);
});
