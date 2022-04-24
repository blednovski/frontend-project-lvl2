import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { getFixturePath, readFile } from '../src/getData.js';

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');

test('check flat json comparison', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(readFile('plain.txt'));
});
