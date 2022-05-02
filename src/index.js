import getDifference from './getDifference.js';
import parser from './parsers.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2) => {
  const diff = getDifference(parser(filepath1), parser(filepath2));
  const formatted = stylish(diff);
  return formatted;
};

export default genDiff;
