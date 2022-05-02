import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { readFile } from '../src/utils.js';

test('check json comparison', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(readFile('json.txt'));
});

test('check yaml comparison', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(readFile('json.txt'));
});
