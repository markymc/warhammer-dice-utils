# warhammer-dice-utils

Javascript util functions for rolling dice in Warhammer games, including rerolls, exploding sixes, etc.

## Usage

`getSuccessfulRolls(numberOfRolls: int, targetValue: int, options: object)`

### Options

`rerolls`: `Rerolls.ONES`, `Rerolls.ALL`, or `Rerolls.NONE` (or pass no key) - reroll failed rolls or one or any value.

`explodingSixes`: `int` - any roll of six results in 'explodingSixes' additional rolls of six being added. These are calculated after any rerolls.

## Examples

`getSuccessfulRolls(6, 4)` - Roll six D6 requiring a roll of 4+.

`getSuccessfulRolls(12, 3, {rerolls: Rerolls.ONES})` - Roll 12 D6 requiring a roll of 3+, rerolling 1s.

`getSuccessfulRolls(18, 5, {explodingSixes: true})` - Roll 18 D6 requiring a roll of 5+, with exploding sixes.

`getSuccessfulRolls(36, 2, {rerolls: Rerolls.ALL, explodingSixes: true})` - Roll 36 D6 requiring a roll of 2+, rerolling all failed rolls, and exploding sixes.
