import _ from 'lodash';

const getDifference = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));

  const result = (keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'nested', key, children: getDifference(value1, value2) };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: value1 };
    }
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: value2 };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed', key, value1, value2,
      };
    }
    return { type: 'unchanged', key, value: value2 };
  }));
  return _.sortBy(result, 'key');
};

export default getDifference;
