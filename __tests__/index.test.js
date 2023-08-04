import {
  getSuccessfulRollsFromRolls,
  getSuccessfulRolls,
  rollMultipleD6,
  Rerolls,
  rollsWithExplodingSixes,
} from '../index';

const rolls = [1, 1, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6];

test('getSuccessfulRollsFromRolls', () => {
  expect(getSuccessfulRollsFromRolls(rolls, 6).length).toEqual(1);
  expect(getSuccessfulRollsFromRolls(rolls, 4).length).toEqual(8);
  expect(getSuccessfulRollsFromRolls(rolls, 2).length).toEqual(11);
});

test('rollMultipleD6', () => {
  const rolls = rollMultipleD6(10000000);
  const averageRoll = rolls.reduce((a, b) => a + b) / rolls.length;
  console.log({ averageRoll });
  expect(averageRoll).toBeCloseTo(3.5, 2);
});

test('rollsWithExplodingSixes', () => {
  const rollsBeforeExplodingSixes = [1, 2, 3, 4, 4, 4, 5, 6, 6];
  const rollsWithSingleExplodingSixes = rollsWithExplodingSixes(
    rollsBeforeExplodingSixes,
    1
  );
  expect(rollsWithSingleExplodingSixes.length).toEqual(11);

  const rollsWithDoubleExplodingSixes = rollsWithExplodingSixes(
    rollsBeforeExplodingSixes,
    2
  );
  expect(rollsWithDoubleExplodingSixes.length).toEqual(13);

  const rollsBeforeExplodingSixes2 = [1, 2, 3, 4, 4, 4, 5];
  const rolls2 = rollsWithExplodingSixes(rollsBeforeExplodingSixes2);
  expect(rolls2.length).toEqual(7);
});

test('getSuccessfulRolls', () => {
  const numberOfRolls = 10000000;

  expect(getSuccessfulRolls(numberOfRolls, 1).length).toEqual(numberOfRolls);
  expect(getSuccessfulRolls(numberOfRolls, 3).length).toBeLessThan(
    numberOfRolls * 0.67
  );
  expect(getSuccessfulRolls(numberOfRolls, 3).length).toBeGreaterThan(
    numberOfRolls * 0.66
  );
  expect(getSuccessfulRolls(numberOfRolls, 5).length).toBeLessThan(
    numberOfRolls * 0.34
  );
  expect(getSuccessfulRolls(numberOfRolls, 5).length).toBeGreaterThan(
    numberOfRolls * 0.33
  );

  const successfulRollsWithRerollAll = getSuccessfulRolls(numberOfRolls, 1, {
    rerolls: Rerolls.ALL,
  });
  expect(successfulRollsWithRerollAll.length).toEqual(numberOfRolls);

  const successfulRollsWithExplodingSixes = getSuccessfulRolls(
    numberOfRolls,
    4,
    {
      explodingSixes: 1,
    }
  );
  expect(successfulRollsWithExplodingSixes.length).toBeLessThan(
    numberOfRolls * 0.67
  );
  expect(successfulRollsWithExplodingSixes.length).toBeGreaterThan(
    numberOfRolls * 0.66
  );

  const successfulRollsWithRerollAllAndExplodingSixes = getSuccessfulRolls(
    numberOfRolls,
    4,
    {
      explodingSixes: true,
      rerolls: Rerolls.ALL,
    }
  );
  expect(successfulRollsWithRerollAllAndExplodingSixes.length).toBeLessThan(
    numberOfRolls * 1.01
  );
  expect(successfulRollsWithRerollAllAndExplodingSixes.length).toBeGreaterThan(
    numberOfRolls * 0.99
  );
});
