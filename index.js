export const Rerolls = {
  NONE: 'none',
  ONES: 'ones',
  ALL: 'all',
};

const rollDice = (sides) => 1 + Math.floor(Math.random() * sides);

const rollD6 = () => rollDice(6);

export const rollMultipleD6 = (numberOfRolls) => {
  let rolls = [];

  for (let i = 0; i < numberOfRolls; i++) {
    const rolledValue = rollD6();
    rolls.push(rolledValue);
  }

  return rolls;
};

export const rollsWithExplodingSixes = (rolls, numberOfExplosions) => {
  const additionalHitRolls = [];
  rolls.forEach(
    (roll) =>
      roll === 6 &&
      additionalHitRolls.push(...Array(numberOfExplosions).fill(roll))
  );
  return [...rolls, ...additionalHitRolls];
};

export const rollsWithRerolls = (rolls, rerolls, targetRoll) => {
  if (rerolls === Rerolls.ONES) {
    return rolls.map((value) => (value === 1 ? rollD6() : value));
  } else if (rerolls === Rerolls.ALL) {
    return rolls.map((value) => (value < targetRoll ? rollD6() : value));
  }
  return rolls; // Just in case
};

export const rollMultipleD6WithOptions = (
  numberOfRolls,
  targetRoll,
  options = {}
) => {
  const { rerolls, explodingSixes } = options;

  let rolls = rollMultipleD6(numberOfRolls);

  if (rerolls) {
    rolls = rollsWithRerolls(rolls, rerolls, targetRoll);
  }

  if (explodingSixes) {
    rolls = rollsWithExplodingSixes(rolls, explodingSixes);
  }

  return rolls;
};

export const getSuccessfulRollsFromRolls = (rolls, targetValue) =>
  rolls.filter((value) => value >= targetValue);

export const getSuccessfulRolls = (numberOfRolls, targetValue, options) => {
  let rolls = rollMultipleD6WithOptions(numberOfRolls, targetValue, options);
  rolls = getSuccessfulRollsFromRolls(rolls, targetValue);
  return rolls;
};
