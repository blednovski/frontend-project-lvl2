import yaml from 'js-yaml';
import { extname } from 'path';
import { readFile } from './utils.js';

const parser = (filepath) => {
  const fileFormat = extname(filepath);
  let result = {};
  if (fileFormat === '.json') {
    result = JSON.parse(readFile(filepath));
  }
  if (fileFormat === '.yml' || fileFormat === '.yaml') {
    result = yaml.load(readFile(filepath));
  }
  return result;
};

export default parser;
