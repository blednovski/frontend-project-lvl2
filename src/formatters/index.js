import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (obj, format) => {
  if (format === 'stylish') return stylish(obj);
  if (format === 'plain') return plain(obj);
  return 'Format is not supported';
};

export default formatter;
