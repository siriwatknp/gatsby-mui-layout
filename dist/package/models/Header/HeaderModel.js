"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HeaderEffect_1 = require("./HeaderEffect");
exports.default = (config, sidebarEffects) => {
    const headerEffect = HeaderEffect_1.default(config);
    const marginInterfaces = [];
    const widthInterfaces = [];
    sidebarEffects.forEach(({ id, getObjectWidth, getObjectMargin }) => {
        if ((typeof config.clipped === "boolean" && !config.clipped) ||
            (typeof config.clipped === "object" && config?.clipped?.[id])) {
            widthInterfaces.push(getObjectWidth(config.id));
            marginInterfaces.push(getObjectMargin(config.id));
        }
    });
    const marginStyle = marginInterfaces.length > 0
        ? marginInterfaces
            .reduce((result, current) => result.combine(current))
            .getStyle()
        : undefined;
    const widthStyle = widthInterfaces.length > 0
        ? widthInterfaces
            .reduce((result, current) => result.combine(current))
            .getStyle()
        : undefined;
    return {
        getStyle: () => ({
            ...marginStyle,
            ...widthStyle,
            ...headerEffect.getHeaderZIndex(),
        }),
    };
};
//# sourceMappingURL=HeaderModel.js.map