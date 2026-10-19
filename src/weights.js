// Part 4 · A kilogram-to-pound table
//
// The club's dumbbells are marked in kilograms, and some members think in
// pounds. The sheet prints a table for the rack.

/**
 * Return one line for each weight from `from` kilograms up to `to`
 * kilograms, going up by `step` each time. `to` is included when the steps
 * land on it; the table never goes past it.
 *
 * Each line reads like this, with one space on each side of "kg", "=" and
 * "lb":
 *
 *   3 kg = 6.6 lb
 *
 * One kilogram is 2.2 pounds. Round the pounds to one decimal place:
 * Math.round(pounds * 10) / 10. Without rounding, 3 * 2.2 comes out as
 * 6.6000000000000005 (see "Arithmetic operators" on why decimals are not
 * exact). A whole number of pounds shows with no decimal: 5 kg = 11 lb.
 *
 * Lines are joined with "\n", with no "\n" after the last line.
 * `from`, `to` and `step` are whole numbers; `from` is at most `to`, and
 * `step` is 1 or more.
 *
 *   kgTable(1, 5, 2)  -> "1 kg = 2.2 lb\n3 kg = 6.6 lb\n5 kg = 11 lb"
 *   kgTable(2, 9, 3)  -> "2 kg = 4.4 lb\n5 kg = 11 lb\n8 kg = 17.6 lb"
 *                        (the next step, 11, would pass 9)
 */
export function kgTable(from, to, step) {
  // TODO: put your code here
}
