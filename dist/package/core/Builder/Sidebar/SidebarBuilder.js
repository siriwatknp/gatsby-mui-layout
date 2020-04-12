"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PersistentSidebar_1 = require("../../../models/PersistentSidebar");
const utils_1 = require("../../../utils");
exports.isUniqueSidebars = (sidebars) => {
    const keys = [];
    let isUnique = true;
    sidebars.forEach(({ id }) => {
        if (!id) {
            throw new Error("[Layout] - All Sidebar must have id");
        }
        if (keys.includes(id)) {
            isUnique = false;
        }
        else {
            keys.push(id);
        }
    });
    return isUnique;
};
const createStateEffect = (effectCreator, config) => state => effectCreator(config, state);
exports.default = () => {
    const state = {};
    const effect = {};
    const addConfig = (breakpoint, config, effectCreator) => {
        if (!state[breakpoint]) {
            state[breakpoint] = [];
        }
        state[breakpoint].push(config);
        if (!effect[breakpoint]) {
            effect[breakpoint] = [];
        }
        effect[breakpoint].push(createStateEffect(effectCreator, config));
        if (!exports.isUniqueSidebars(state[breakpoint])) {
            throw new Error(`Sidebar id: ${config.id} is duplicated at breakpoint "${breakpoint}"`);
        }
    };
    return {
        createPersistentSidebarConfig: function (breakpoint, config) {
            addConfig(breakpoint, config, PersistentSidebar_1.createPersistentSidebarEffect);
        },
        createTemporarySidebarConfig: function (breakpoint, config) {
            // todo: change effect creator to createTemporarySidebarEffect
            addConfig(breakpoint, config, PersistentSidebar_1.createPersistentSidebarEffect);
        },
        getConfig: () => state,
        getBreakpointConfig: breakpoint => utils_1.pickNearestBreakpoint(state, breakpoint),
        getBreakpointEffects: breakpoint => utils_1.pickNearestBreakpoint(effect, breakpoint),
    };
};
//# sourceMappingURL=SidebarBuilder.js.map