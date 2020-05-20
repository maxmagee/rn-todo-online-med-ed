/**
 * Returns a random date in the year 2020
 */
const getRandomDate = () => {
  const start = new Date(2020, 0, 1);
  const end = new Date(2020, 12, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export default {
  getRandomDate,
};
