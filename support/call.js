// Used by the tests. You do not need to change this file, but you may read it.
//
// A loop that never stops would freeze the tests, and you would see nothing.
// So each test runs your function on its own, in a separate worker, and stops
// it after a second. If your loop never ends, the test says so instead.
//
// This file also writes the messages for three mistakes that every function
// here can make: a loop that never stops, a function that calls itself, and a
// path with no `return`.
//
// `node --test` runs every file in test/, this one included. It holds no tests
// of its own, so it always passes.

import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { inspect } from 'node:util';
import assert from 'node:assert/strict';

const LIMIT_MS = 1000;

/** A value as it appears in a message. In strings, a space shows as · and a line end as ⏎. */
export function show(value) {
  if (typeof value !== 'string') return inspect(value);
  return `"${value.replaceAll(' ', '·').replaceAll('\n', '⏎')}"`;
}

export const LEGEND = '(In this message, · is a space and ⏎ is a line end.)';

/**
 * Call `name(...args)` from the file at `url` and return its result.
 * If the call never finishes, throws, or gives undefined, the test fails with
 * a message that says why. `whenUndefined` explains which path had no return.
 */
export async function answer(url, name, args, whenUndefined) {
  const call = `${name}(${args.map(show).join(', ')})`;
  const result = await runInWorker(url, name, args);

  if (result.timedOut) {
    assert.fail(`${call} did not finish within a second, so its loop never stops. A loop stops when its ` +
      'condition becomes false: check that the condition uses something that changes on every iteration. ' +
      'See "The while loop".');
  }
  if (result.error?.name === 'RangeError') {
    assert.fail(`${call} stopped with RangeError: ${result.error.message}. That happens when a function ` +
      `calls itself: writing ${name}(...) inside ${name} starts the whole function again, which calls it ` +
      'again, and it never finishes. Build the answer with a loop and the values handed in. ' +
      'See "Writing a function\'s answer".');
  }
  if (result.error) {
    assert.fail(`${call} stopped with an error — ${result.error.name}: ${result.error.message}`);
  }
  if (result.value === undefined) {
    assert.fail(`${call} returned undefined, which means the function ended without a \`return\`. ` +
      `${whenUndefined} See "Writing a function's answer".`);
  }
  return result.value;
}

function runInWorker(url, name, args) {
  return new Promise((resolve) => {
    const worker = new Worker(new URL(import.meta.url), { workerData: { url: String(url), name, args } });
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ timedOut: true });
    }, LIMIT_MS);
    worker.once('message', (result) => {
      clearTimeout(timer);
      worker.terminate();
      resolve(result);
    });
    worker.once('error', (e) => {
      clearTimeout(timer);
      resolve({ error: { name: e.name, message: e.message } });
    });
  });
}

/* Inside the worker: import the file, call the function, post the result to the test. */
if (!isMainThread) {
  const { url, name, args } = workerData;
  try {
    const mod = await import(url);
    parentPort.postMessage({ value: mod[name](...args) });
  } catch (e) {
    parentPort.postMessage({ error: { name: e.name, message: e.message } });
  }
}
