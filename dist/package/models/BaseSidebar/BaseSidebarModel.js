"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config, state) => {
    const { collapsible, collapsedWidth, width } = config;
    const isSidebarCollapsed = state?.sidebar?.[config.id]?.collapsed;
    const sidebarWidth = collapsible && isSidebarCollapsed ? collapsedWidth : width;
    return {
        currentWidth: sidebarWidth,
    };
};
//# sourceMappingURL=BaseSidebarModel.js.map