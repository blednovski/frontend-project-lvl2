import _ from 'lodash';

const indent = (spaces) => '  '.repeat(spaces);

const stringify = (value, spaces = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = Object.keys(value).map((node) => `${indent(spaces + 2)}  ${node}: ${stringify(value[node], spaces + 2)}`);
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
        return `${indent(spaces)}- ${node.key}: ${stringify(node.value, spaces)}`;
      }
      if (node.type === 'added') {
        return `${indent(spaces)}+ ${node.key}: ${stringify(node.value, spaces)}`;
      }
      if (node.type === 'unchanged') {
        return `${indent(spaces + 1)}${node.key}: ${stringify(node.value, spaces)}`;
      }
      if (node.type === 'changed') {
        return `${indent(spaces)}- ${node.key}: ${stringify(node.value1, spaces)}\n${indent(spaces)}+ ${node.key}: ${stringify(node.value2, spaces)}`;
      }
      throw new Error(`Unknown node type '${node.type}'`);
    });
    const innerValue = lines.join('\n');
    return `{\n${innerValue}\n${indent(spaces - 1)}}`;
  };
  return iter(obj);
};

export default stylish;
