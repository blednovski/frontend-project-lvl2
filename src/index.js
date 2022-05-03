import getDifference from './getDifference.js';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const diff = getDifference(parser(filepath1), parser(filepath2));
  const formatted = formatter(diff, format);
  return formatted;
};

export default genDiff;
