// Part 4 — kgTable
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { answer, show, LEGEND } from '../support/call.js';

const file = new URL('../src/weights.js', import.meta.url);

function whatWentWrong(got, expected, to) {
  if (typeof got !== 'string') return 'It should return a string: the lines of the table, joined with "\\n".';
  if (/\d\.\d\d/.test(got)) return 'Some pounds are not rounded. 3 * 2.2 is 6.6000000000000005 in JavaScript, because decimals are not exact. Round to one decimal place as the comment shows. See "Arithmetic operators".';
  if (got === '') return `The table came back empty, so the loop body never ran. Here the first row is also the last, and the table includes \`to\` (${to}). An off-by-one: check the loop's condition. See "The for loop".`;
  if (got.endsWith('\n')) return 'It ends with a line end (⏎). Line ends go BETWEEN lines, so there is none after the last one.';
  if (got.startsWith('\n')) return 'It starts with a line end (⏎). The first line is the row for `from`.';
  const gotLines = got.split('\n');
  const wantLines = expected.split('\n');
  if (gotLines.length === wantLines.length - 1 && expected.startsWith(got)) {
    return `The last row, ${show(wantLines[wantLines.length - 1])}, is missing: an off-by-one. The table includes \`to\` (${to}) when the steps land on it. See "The for loop".`;
  }
  if (gotLines.length === wantLines.length - 1 && expected.endsWith(got)) {
    return `The first row, ${show(wantLines[0])}, is missing: an off-by-one. The table starts at \`from\`.`;
  }
  if (gotLines.length > wantLines.length) return 'It has too many rows. The table goes up by `step` each time and never goes past `to`.';
  return 'Compare the two line by line. Each line reads like "3 kg = 6.6 lb", with one space on each side of "kg", "=" and "lb".';
}

async function check(from, to, step, expected) {
  const call = `kgTable(${from}, ${to}, ${step})`;
  const got = await answer(file, 'kgTable', [from, to, step],
    `${call} needs to return the table it built.`);
  if (got !== expected) {
    assert.fail(`${call} should be ${show(expected)}, but it returned ${show(got)}. ${whatWentWrong(got, expected, to)} ${LEGEND}`);
  }
}

test('one row when from and to are the same', async () => {
  await check(10, 10, 5, '10 kg = 22 lb');
});

test('goes from `from` up to and including `to`, by `step`', async () => {
  await check(1, 5, 2, '1 kg = 2.2 lb\n3 kg = 6.6 lb\n5 kg = 11 lb');
  await check(20, 23, 1, '20 kg = 44 lb\n21 kg = 46.2 lb\n22 kg = 48.4 lb\n23 kg = 50.6 lb');
});

test('stops before passing `to` when the steps do not land on it', async () => {
  await check(2, 9, 3, '2 kg = 4.4 lb\n5 kg = 11 lb\n8 kg = 17.6 lb');
});

test('pounds are rounded to one decimal place', async () => {
  await check(6, 14, 4, '6 kg = 13.2 lb\n10 kg = 22 lb\n14 kg = 30.8 lb');
  await check(197, 199, 2, '197 kg = 433.4 lb\n199 kg = 437.8 lb');
});
