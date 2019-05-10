export const encodeFormParams = (inputs) => {
  const inputTypeMap = {
    checkbox: 'checked'
  };
  const getValue = input => input[inputTypeMap[input.type] || 'value'];
  const params = inputs.map(el => `${decodeURIComponent(el.name)}=${decodeURIComponent(getValue(el))}`);
  return params.join('&');
};

export function *range(min, max) {
  if (min > max) {
    throw new Error('Range deve ser chamada com min <= max');
  }
  for (let value = min; value < max; value++) {
    yield value;
  }
}
