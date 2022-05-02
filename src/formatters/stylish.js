const indent = (count = 1) => '  '.repeat(count);

const stylish = (obj) => {
  const iter = (newObj) => newObj.flatMap((node) => {
    if (node.type === 'nested') {
      return `${indent(2)}${node.key}: ${stylish(node.children)}\n`;
    }
    if (node.type === 'removed') {
      return `${indent()}- ${node.key}: ${node.value}\n`;
    }
    if (node.type === 'added') {
      return `${indent()}+ ${node.key}: ${node.value}\n`;
    }
    if (node.type === 'unchanged') {
      return `${indent(2)}${node.key}: ${node.value}\n`;
    }
    if (node.type === 'updated') {
      return [`${indent()}- ${node.key}: ${node.value1}\n${indent()}+ ${node.key}: ${node.value2}\n`];
    }
    return null;
  });
  return `{\n${iter(obj).join('')}}`;
};

export default stylish;
