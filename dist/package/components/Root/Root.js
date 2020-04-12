"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styles_1 = require("@material-ui/core/styles");
const Context_1 = require("../../core/Context");
const baseTheme = styles_1.createMuiTheme();
const Root = ({ theme = baseTheme, themeProviderOmitted = false, children, ...props }) => {
    if (themeProviderOmitted) {
        return react_1.default.createElement(Context_1.LayoutProvider, Object.assign({}, props), children);
    }
    return (react_1.default.createElement(styles_1.ThemeProvider, { theme: theme },
        react_1.default.createElement(Context_1.LayoutProvider, Object.assign({}, props), children)));
};
exports.default = Root;
//# sourceMappingURL=Root.js.map