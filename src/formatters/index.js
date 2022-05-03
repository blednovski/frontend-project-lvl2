import stylish from './stylish.js';

const formatter = (obj, format) => {
  if (format === 'stylish') return stylish(obj);
  return 'Format is not supported';
};

export default formatter;
