import readFile from './getData.js';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
    const file1content = readFile(filepath1);
    const file2content = readFile(filepath2);
    const object1 = JSON.parse(file1content);
    const object2 = JSON.parse(file2content);

    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    const sortedKeys = _.sortBy([...keys1, ...keys2]);

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
            const dual = [`  - ${key}: ${object1[key]}`, `  + ${key}: ${object2[key]}`];
            return dual;
        }
    }));
    const result = `{\n${getComparison.join('\n')}\n}`;
    return result;
};

export default genDiff;