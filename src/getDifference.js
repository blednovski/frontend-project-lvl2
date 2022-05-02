import _ from 'lodash';

const getDifference = (data1, data2) => {
  const sortedKeys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]);

  const result = (sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      return { type: 'nested', key, children: getDifference(value1, value2) };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: value1 };
    }
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: value2 };
    }
    if ((typeof value1 !== typeof value2) || (value1 !== value2)) {
      return {
        type: 'updated', key, value1, value2,
      };
    }
    return { type: 'unchanged', key, value: value2 };
  }));
  return _.sortBy(result, 'key');
};

export default getDifference;
