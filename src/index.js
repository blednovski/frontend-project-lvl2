import getDifference from './getDifference.js';
import parse from './parsers.js';
import formatter from './formatters/index.js';
import { readFile, getExtension } from './utils.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const type1 = getExtension(file1);
  const type2 = getExtension(file2);

  const diff = getDifference(parse(data1, type1), parse(data2, type2));
  const formatted = formatter(diff, format);
  return formatted;
};

export default genDiff;
