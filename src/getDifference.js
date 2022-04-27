import _ from 'lodash';
import parser from './parsers.js';

const getDifference = (filepath1, filepath2) => {
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);
  const sortedKeys = _.sortBy([...Object.keys(object1), ...Object.keys(object2)]);

  const getComparison = _.uniq(sortedKeys.flatMap((key) => {
    if ((_.has(object1, key)) && !(_.has(object2, key))) {
      return `  - ${key}: ${object1[key]}`;
    }
    if ((_.has(object2, key)) && !(_.has(object1, key))) {
      return `  + ${key}: ${object2[key]}`;
    }
    if (object1[key] === object2[key]) {
      return `    ${key}: ${object2[key]}`;
    }
    if (object1[key] !== object2[key]) {
      return [`  - ${key}: ${object1[key]}`, `  + ${key}: ${object2[key]}`];
    }
    return null;
  }));
  const result = `{\n${getComparison.join('\n')}\n}`;
  return result;
};

export default getDifference;
