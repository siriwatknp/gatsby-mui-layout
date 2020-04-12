"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sidebarEffects, objectId) => {
    const marginInterfaces = [];
    const widthInterfaces = [];
    sidebarEffects.forEach(({ getObjectWidth, getObjectMargin }) => {
        widthInterfaces.push(getObjectWidth(objectId));
        marginInterfaces.push(getObjectMargin(objectId));
    });
    return {
        marginStyle: marginInterfaces
            .reduce((result, current) => result.combine(current))
            .getStyle(),
        widthStyle: widthInterfaces
            .reduce((result, current) => result.combine(current))
            .getStyle(),
    };
};
//# sourceMappingURL=SidebarListEffect.js.map