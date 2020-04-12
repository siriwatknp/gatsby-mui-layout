"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.getCssMargin = (m) => {
    if (typeof m === "string") {
        return `calc(${m})`;
    }
    return m;
};
const transformMargin = (m, fn = val => val) => ({
    ...(!utils_1.isNil(m.marginLeft) && {
        marginLeft: fn(m.marginLeft),
    }),
    ...(!utils_1.isNil(m.marginRight) && {
        marginRight: fn(m.marginRight),
    }),
});
const getCssValue = (v1, v2) => {
    if (utils_1.isNil(v1))
        return v2;
    if (utils_1.isNil(v2))
        return v1;
    return `${utils_1.toValidCssValue(v1)} + ${utils_1.toValidCssValue(v2)}`;
};
exports.combineMargin = (m1, m2) => {
    if (!m1 && !m2)
        return undefined;
    if (!m1 && m2)
        return m2;
    if (m1 && !m2)
        return m1;
    const marginLeft = getCssValue(m1.marginLeft, m2.marginLeft);
    const marginRight = getCssValue(m1.marginRight, m2.marginRight);
    return transformMargin({ marginLeft, marginRight });
};
const createMarginInterface = (value) => {
    return {
        value,
        combine: m => createMarginInterface(exports.combineMargin(value, m.value)),
        getStyle: () => transformMargin(value, exports.getCssMargin),
    };
};
exports.default = createMarginInterface;
//# sourceMappingURL=MarginModel.js.map