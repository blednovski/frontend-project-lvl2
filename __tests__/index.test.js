import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { readFile } from '../src/utils.js';

const tests = [
  {
    filename1: 'file1.json', filename2: 'file2.json', output: 'stylish.txt', format: 'stylish',
  },
  {
    filename1: 'file1.yml', filename2: 'file2.yml', output: 'stylish.txt', format: 'stylish',
  },
  {
    filename1: 'file1.json', filename2: 'file2.yml', output: 'stylish.txt', format: 'stylish',
  },
  {
    filename1: 'file1.yml', filename2: 'file2.json', output: 'stylish.txt', format: 'stylish',
  },
  {
    filename1: 'file1.json', filename2: 'file2.yml', output: 'plain.txt', format: 'plain',
  },
  {
    filename1: 'file1.yml', filename2: 'file2.json', output: 'json.txt', format: 'json',
  },
];

test.each(tests)('json/yaml stylish, plain and json tests', ({
  filename1, filename2, output, format,
}) => {
  const expected = readFile(output);
  const result = genDiff(filename1, filename2, format);
  expect(result).toEqual(expected);
});
