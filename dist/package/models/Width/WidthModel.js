"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.getCssWidth = (externalGap) => {
    if (typeof externalGap === "string") {
        return `calc(100% - (${externalGap}))`;
    }
    if (typeof externalGap === "number") {
        if (externalGap === 0)
            return "100%";
        return `calc(100% - ${externalGap}px)`;
    }
    return "auto";
};
exports.sumExternalGap = (a, b) => {
    if (utils_1.isNilOrEmpty(a) && utils_1.isNilOrEmpty(b))
        return undefined;
    if (a === 0 && b === 0)
        return 0;
    if (!a && b)
        return b;
    if (a && !b)
        return a;
    return `${utils_1.toValidCssValue(a)} + ${utils_1.toValidCssValue(b)}`;
};
const createWidthInterface = (externalGap) => {
    return {
        value: externalGap,
        combine: w => createWidthInterface(exports.sumExternalGap(externalGap, w.value)),
        getStyle: () => ({
            width: exports.getCssWidth(externalGap),
        }),
    };
};
exports.default = createWidthInterface;
//# sourceMappingURL=WidthModel.js.map