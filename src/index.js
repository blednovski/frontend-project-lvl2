import getDifference from './getDifference.js';

const genDiff = (filepath1, filepath2) => {
  const diff = getDifference(filepath1, filepath2);
  return diff;
};

export default genDiff;
