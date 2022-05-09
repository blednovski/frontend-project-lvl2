import yaml from 'js-yaml';
import { extname } from 'path';
import { readFile } from './utils.js';

const parse = (file) => {
  const fileFormat = extname(file);
  if (fileFormat === '.json') {
    return JSON.parse(readFile(file));
  }
  if (fileFormat === '.yml' || fileFormat === '.yaml') {
    return yaml.load(readFile(file));
  }
  throw new Error(`Unsupported file format '${fileFormat}'`);
};

export default parse;
