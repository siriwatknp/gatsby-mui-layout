"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createBreakpoints_1 = require("@material-ui/core/styles/createBreakpoints");
const pickNearestBreakpoint = (value, breakpoint) => {
    const possibleBreakpoints = createBreakpoints_1.keys.slice(0, createBreakpoints_1.keys.indexOf(breakpoint) + 1);
    return possibleBreakpoints.reduceRight((result, currentBreakpoint) => {
        if (result)
            return result;
        return value[currentBreakpoint];
    }, value[breakpoint]);
};
exports.default = pickNearestBreakpoint;
//# sourceMappingURL=pickNearestBreakpoint.js.map