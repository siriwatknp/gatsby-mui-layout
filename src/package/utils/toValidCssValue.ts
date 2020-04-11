const toValidCssValue = (value: string | number) =>
  typeof value === 'number' && value !== 0 ? `${value}px` : value;

export default toValidCssValue;
