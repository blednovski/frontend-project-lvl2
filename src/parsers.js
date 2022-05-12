import yaml from 'js-yaml';

const parse = (data, type) => {
  if (type === 'json') {
    return JSON.parse(data);
  }
  if (type === 'yml' || type === 'yaml') {
    return yaml.load(data);
  }
  throw new Error(`Unsupported type '${type}'`);
};

export default parse;
