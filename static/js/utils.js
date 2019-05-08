export const encodeFormParams = (inputs) => {
  const inputTypeMap = {
    checkbox: 'checked'
  };
  const getValue = input => input[inputTypeMap[input.type] || 'value'];
  const params = inputs.map(el => `${decodeURIComponent(el.name)}=${decodeURIComponent(getValue(el))}`);
  return params.join('&');
};
