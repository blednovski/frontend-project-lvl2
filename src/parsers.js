import yaml from 'js-yaml';
import { extname } from 'path';
import { readFile } from './utils.js';

const parse = (file) => {
  const fileFormat = extname(file);
  let result = {};
  if (fileFormat === '.json') {
    result = JSON.parse(readFile(file));
  }
  if (fileFormat === '.yml' || fileFormat === '.yaml') {
    result = yaml.load(readFile(file));
  }
  return result;
};

export default parse;
