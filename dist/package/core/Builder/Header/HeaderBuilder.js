"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const Header_1 = require("../../../models/Header");
exports.default = (initialConfig) => {
    const map = {};
    if (initialConfig) {
        map.xs = initialConfig;
    }
    return {
        createConfig: function (breakpoint, config) {
            map[breakpoint] = config;
        },
        getConfig: () => map,
        getBreakpointConfig: function (breakpoint) {
            return utils_1.pickNearestBreakpoint(map, breakpoint);
        },
        getBreakpointEffect: function (breakpoint) {
            return Header_1.createHeaderEffect(this.getBreakpointConfig(breakpoint));
        },
        getResultStyle: (state, sidebar) => {
            const result = {};
            Object.entries(map).forEach(([breakpoint, config]) => {
                const stateEffectCreators = sidebar.getBreakpointEffects(breakpoint);
                if (stateEffectCreators) {
                    const effects = stateEffectCreators.map(c => c(state));
                    result[breakpoint] = Header_1.default(config, effects).getStyle();
                }
            });
            return result;
        },
    };
};
//# sourceMappingURL=HeaderBuilder.js.map