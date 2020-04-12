"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createBreakpoints_1 = require("@material-ui/core/styles/createBreakpoints");
exports.default = (breakpointsObject, breakpoints) => {
    const entries = Object.entries(breakpointsObject);
    let mediaQueries = {};
    entries.forEach(([key, value]) => {
        if (typeof value === "object") {
            if (key === "xs") {
                mediaQueries = { ...mediaQueries, ...value };
            }
            if (key !== "xs" && createBreakpoints_1.keys.includes(key)) {
                mediaQueries[breakpoints.up(key)] = value;
            }
        }
        else {
            mediaQueries[key] = value;
        }
    });
    return mediaQueries;
};
//# sourceMappingURL=createBreakpointStyles.js.map