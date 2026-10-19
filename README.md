# Loops that build, count and search

Four small functions, each built around one loop. The loop in `totalReps`
walks a string one character at a time and counts. The loop in `yearsToGoal`
counts how many iterations it takes to reach a goal. The loop in
`firstVowelAt` searches a word and stops as soon as it finds what it is
looking for. The loop in `kgTable` builds up text a line at a time.

The program in `src/club-sheet.js` uses all four functions to work out a
lifting club's weekly sheet. The sheet shows the reps members logged this week, a
kilogram-to-pound table for the dumbbell rack, how many years the club must
save for a new squat rack, and the locker tags for new members. You write the
functions; the club sheet program is already written. Each function you finish
fixes one section of the sheet.

## What each part leans on

| Part | File | Lessons |
|---|---|---|
| 1 `totalReps` | `src/reps.js` | The for…of loop; The if statement |
| 2 `yearsToGoal` | `src/savings.js` | The while loop; Arithmetic operators |
| 3 `firstVowelAt` | `src/vowels.js` | The for loop; Leaving a loop early: break and continue; Working with strings |
| 4 `kgTable` | `src/weights.js` | The for loop; Arithmetic operators |

Every part also leans on *Writing a function's answer*.

## Getting started

1. Open **your repository**. It is made for you: private, and named for this
   homework, the term and your username — `<term>-cs140-flow-loops-<you>`. On
   [this homework's page](https://wwcc.dev/#/lesson/flow-loops), type your
   GitHub username and click **Open my Codespace**. On your own computer, clone
   it with GitHub Desktop (**Code**, then **Open with GitHub Desktop**) and
   check that `node --version` prints 22 or later. The lesson *How a homework
   works* walks through both.
2. Run the club sheet:

   ```sh
   npm start
   ```

   Every section of the sheet says `undefined`. A function returns
   `undefined` when it has no `return`, and none of your four functions has a
   `return` yet. That is the expected starting point.
3. Run the tests:

   ```sh
   npm test
   ```

   Every test fails at first. That is the starting point too, not a problem.

While you work on one part, run just its tests:

```sh
node --test test/2-savings.test.js
```

The same tests run on GitHub every time you push. The **Actions** tab shows
the result.

## How to write each answer

Each function is already written except for the code between its braces.
Write your code there, where it says `// TODO: put your code here`. Leave
`export` in front of each function: `export` is what lets the tests and the
club sheet use the function.

Each of these functions has a loop in it. There are two ways to send the
function's answer back, and both work:

- keep the answer in a `let` variable, change it as the loop runs, and
  `return` it after the loop; or
- `return` from inside the loop the moment you have the answer.

Whichever you choose, **every path through the function has to reach a `return`**,
including the path where the loop finishes without finding anything. A path
with no `return` returns `undefined`, and a failing test's message names the
input that took that path.

Stuck? Put `console.log(something)` inside a loop, and it prints the value of
`something` on every iteration, which shows you what the loop is doing. The tests do not look at what you print, so
print as much as you like.

## The parts

The comment above each function, in its own file, says what the function
receives and what it returns, with examples. When a test fails, its message
says what came back and what to look at. When a message shows text, each space
appears as `·` and each line end, the newline character `"\n"`, appears as
`⏎`. That way an extra space or line end is easy to see.

If a loop never stops, the tests stop it after one second and say so in the
message. The club sheet program has no such limit. If `npm start` seems to
hang, a loop is probably running forever: press **Ctrl+C** to stop the
program.

### Part 1 · The week's reps — `src/reps.js`

Members log their training on the club's whiteboard: one `|` for each rep,
with a space between sets. `"||||| |||| |||"` is three sets, of 5, 4 and 3
reps. `totalReps` returns how many reps a log holds: here, `12`. The spaces
only separate the sets, so they are not counted. An empty log, `""`, is `0`
reps.

Each iteration needs one character, and never its position, so this is a job
for a `for…of` loop. Count a character when it is a `|`.

### Part 2 · Years to a savings goal — `src/savings.js`

The club is saving for a new squat rack. Its savings earn **interest**: once a
year, the bank adds a percentage of what is saved. `yearsToGoal` takes three
numbers:

- `savings`, the amount saved at the start;
- `rate`, the interest rate, as a percentage: 10 means 10% a year;
- `goal`, the price of the rack.

It returns how many whole years it takes for the savings to reach the goal.

**One year's interest** is `rate` percent of what is saved, which you write as
`savings * rate / 100`. Add it to the savings, and that is the end of one year.
(JavaScript's `%` is not percent: it is the remainder operator, from
*Arithmetic operators*.) Here is `yearsToGoal(1000, 10, 1331)`, a year at a
time:

| Year | Saved at the start | Interest: saved × 10 / 100 | Saved at the end |
|---|---|---|---|
| 1 | 1000 | 100 | 1100 |
| 2 | 1100 | 110 | 1210 |
| 3 | 1210 | 121 | 1331 |

After 3 years the savings are 1331, which is the goal. Reaching the goal
exactly counts, so the answer is `3`. If `savings` already reaches `goal`
before any years pass, the answer is `0`.

Before the loop starts, you do not know how many years it will take; finding
that out is the function's job. A `while` loop suits a job like that: it keeps
repeating for as long as its condition is `true`, however many iterations that
takes.

### Part 3 · The first vowel — `src/vowels.js`

`firstVowelAt("Grace")` is `2`: G is at index 0, r at 1, a at 2. A vowel is a,
e, i, o or u, in lowercase or in capitals; "y" is not one here. A word with no
vowel gives `-1`.

Go through the word's indexes in order, starting at 0. The first vowel you
find is the answer, so there is no reason to keep looking after it.
*Leaving a loop early: break and continue* shows how to leave a loop at that point.
`"aeiou".includes(letter)` is `true` when `letter` is one of those five
lowercase vowels. A capital such as the I in "Ingrid" matches only after you
change it to lowercase with `toLowerCase()`, from *Working with strings*.

### Part 4 · A kilogram-to-pound table — `src/weights.js`

`kgTable(1, 5, 2)` is

```text
1 kg = 2.2 lb
3 kg = 6.6 lb
5 kg = 11 lb
```

with the lines joined by `"\n"` and no `"\n"` after the last line. The table
starts at `from` kilograms and goes up by `step` on each line. It includes
`to` when the steps land on it exactly, and it never goes past `to`.

One kilogram is 2.2 pounds. But in JavaScript, `3 * 2.2` is
`6.6000000000000005`, because decimal numbers are not stored exactly
(*Arithmetic operators* explains why). The comment above `kgTable` shows how
to round the pounds to one decimal place. The columns do not need to line up:
put one space on each side of `kg`, `=` and `lb`.

## Done means

- `npm test` passes every test.
- `npm start` prints a sheet with no `undefined` in it.

## Using an AI assistant

`AGENTS.md` in this repository tells AI coding assistants how this course wants
them to help: as a tutor who explains errors, asks questions and gives hints,
not by writing your answers. Most assistants read it automatically. It is in
the open, so read it too. It says what good AI help looks like.

In VS Code, in a Codespace or on your own computer, AI code suggestions are
switched off for this homework (`.vscode/settings.json`), so the code you hand
in is your own. Chat is on, and it follows `AGENTS.md`: ask it about an error,
a failing test or an idea.
