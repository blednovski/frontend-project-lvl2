import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { readFile } from '../src/utils.js';

test('check json comparison', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(readFile('stylish.txt'));
});

test('check yaml comparison', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(readFile('stylish.txt'));
});

test('check plain format', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(readFile('plain.txt'));
});

test('check json format', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(readFile('json.txt'));
});
