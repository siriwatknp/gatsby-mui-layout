"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createBreakpoints_1 = require("@material-ui/core/styles/createBreakpoints");
const pickNearestBreakpoint_1 = require("./pickNearestBreakpoint");
const createBreakpointStyles_1 = require("./createBreakpointStyles");
describe("pickNearestBreakpoint", () => {
    it("should return matched breakpoint value", () => {
        const value = {
            xs: "xs",
            md: "md",
            xl: "xl",
        };
        expect(pickNearestBreakpoint_1.default(value, "xs")).toEqual("xs");
        expect(pickNearestBreakpoint_1.default(value, "xl")).toEqual("xl");
    });
    it("should return nearest breakpoint value if target not found", () => {
        const value = {
            xs: "xs",
            md: "md",
            xl: "xl",
        };
        expect(pickNearestBreakpoint_1.default(value, "lg")).toEqual("md");
    });
});
const breakpoints = createBreakpoints_1.default({});
describe("createBreakpointStyles", () => {
    it("turns into media queries object", () => {
        expect(createBreakpointStyles_1.default({
            xs: { margin: 0 },
            sm: { margin: 1 },
            md: { margin: 2 },
            lg: { margin: 3 },
            xl: { margin: 4 },
        }, breakpoints)).toEqual({
            margin: 0,
            "@media (min-width:600px)": {
                margin: 1,
            },
            "@media (min-width:960px)": {
                margin: 2,
            },
            "@media (min-width:1280px)": {
                margin: 3,
            },
            "@media (min-width:1920px)": {
                margin: 4,
            },
        });
    });
    it("mix media queries", () => {
        const result = createBreakpointStyles_1.default({
            padding: 0,
            sm: {
                margin: 2,
            },
        }, breakpoints);
        expect(result).toEqual({
            padding: 0,
            "@media (min-width:600px)": {
                margin: 2,
            },
        });
    });
});
//# sourceMappingURL=utils.spec.js.map