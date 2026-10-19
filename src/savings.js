// Part 2 · Years until a savings goal
//
// The club is saving for a new squat rack. The sheet says how many years of
// interest it will take before the savings cover the price.
//
// You cannot know in advance how many times this loop runs. That is the
// question the function answers.

/**
 * Count the whole years until `savings` reaches `goal`, and send the count
 * back.
 *
 *   savings  the amount saved at the start
 *   rate     the interest rate: how many percent the savings grow each year
 *   goal     the amount the club needs
 *
 * Interest is added once a year, at the end of the year. One year's interest
 * is `rate` percent of what is saved at that point, which in JavaScript is
 *
 *   savings * rate / 100
 *
 * and it is added to the savings. A `rate` of 5 means 5%, so 1000 earns
 * 1000 * 5 / 100 = 50 in its first year and becomes 1050. Nothing is rounded.
 * (`%` is not percent in JavaScript: it is the remainder operator.)
 *
 * The goal is reached when the savings are equal to it or more. If the savings
 * already reach the goal, no years are needed: return 0.
 *
 * `savings` and `rate` are always more than 0.
 *
 *   yearsToGoal(1000, 10, 1331)  -> 3    (1100, then 1210, then exactly 1331)
 *   yearsToGoal(1000, 5, 2000)   -> 15
 *   yearsToGoal(500, 5, 500)     -> 0    (already there)
 */
export function yearsToGoal(savings, rate, goal) {
  // TODO: put your code here
}
