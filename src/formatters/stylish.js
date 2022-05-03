import _ from 'lodash';

const indent = (spaces) => '  '.repeat(spaces);

const getString = (value, spaces = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = Object.keys(value).map((node) => `${indent(spaces + 2)}  ${node}: ${getString(value[node], spaces + 2)}`);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${indent(spaces + 1)}}`;
};

const stylish = (obj) => {
  const iter = (newObj, spaces = 1) => {
    const lines = newObj.map((node) => {
      if (node.type === 'nested') {
        return `${indent(spaces)}  ${node.key}: ${iter(node.children, spaces + 2)}`;
      }
      if (node.type === 'removed') {
        return `${indent(spaces)}- ${node.key}: ${getString(node.value, spaces)}`;
      }
      if (node.type === 'added') {
        return `${indent(spaces)}+ ${node.key}: ${getString(node.value, spaces)}`;
      }
      if (node.type === 'unchanged') {
        return `${indent(spaces + 1)}${node.key}: ${getString(node.value, spaces)}`;
      }
      if (node.type === 'updated') {
        return `${indent(spaces)}- ${node.key}: ${getString(node.value1, spaces)}\n${indent(spaces)}+ ${node.key}: ${getString(node.value2, spaces)}`;
      }
      return null;
    });
    const innerValue = lines.join('\n');
    return `{\n${innerValue}\n${indent(spaces - 1)}}`;
  };
  return iter(obj);
};

export default stylish;
