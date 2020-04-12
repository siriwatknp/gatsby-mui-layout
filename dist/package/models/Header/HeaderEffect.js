"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incrementZIndex = (theme, plus) => ({
    zIndex: (theme?.zIndex?.drawer ?? 1200) + plus,
});
exports.isSomeClipped = ({ clipped }) => {
    if (typeof clipped === "boolean") {
        return clipped;
    }
    if (typeof clipped === "object") {
        return Object.values(clipped).some(value => !!value);
    }
    return false;
};
exports.default = (header) => {
    const isAboveSomeSidebars = header.position !== "static" && exports.isSomeClipped(header);
    return {
        id: header.id,
        getHeaderZIndex: (theme) => isAboveSomeSidebars ? incrementZIndex(theme, 10) : undefined,
        getEdgeSidebarZIndex: (sidebarId, theme) => isAboveSomeSidebars &&
            ((typeof header.clipped === "boolean" && !header.clipped) ||
                (typeof header.clipped === "object" &&
                    typeof header.clipped?.[sidebarId] !== "undefined" &&
                    !header.clipped?.[sidebarId]))
            ? incrementZIndex(theme, 20)
            : undefined,
    };
};
//# sourceMappingURL=HeaderEffect.js.map