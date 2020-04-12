"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toValidCssValue = (value) => typeof value === 'number' && value !== 0 ? `${value}px` : value;
exports.default = toValidCssValue;
//# sourceMappingURL=toValidCssValue.js.map