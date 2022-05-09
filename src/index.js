import getDifference from './getDifference.js';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const diff = getDifference(parse(file1), parse(file2));
  const formatted = formatter(diff, format);
  return formatted;
};

export default genDiff;
