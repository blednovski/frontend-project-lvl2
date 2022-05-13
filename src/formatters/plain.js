import _ from 'lodash';

const getNodeKey = (key, ancestor) => {
  if (ancestor === '') return `${key}`;
  return `${ancestor}.${key}`;
};

const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const plain = (obj) => {
  const iter = (newObj, ancestor = '') => {
    const lines = newObj.map((node) => {
      if (node.type === 'nested') {
        return iter(node.children, getNodeKey(node.key, ancestor));
      }
      if (node.type === 'removed') {
        return `Property '${getNodeKey(node.key, ancestor)}' was removed`;
      }
      if (node.type === 'added') {
        return `Property '${getNodeKey(node.key, ancestor)}' was added with value: ${formatValue(node.value)}`;
      }
      if (node.type === 'changed') {
        return `Property '${getNodeKey(node.key, ancestor)}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      }
      return null;
    })
      .filter((node) => node !== null);
    return lines.join('\n');
  };
  return iter(obj);
};

export default plain;
