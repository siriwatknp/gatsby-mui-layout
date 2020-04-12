"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upperFirst_1 = require("../../utils/upperFirst");
const BaseSidebar_1 = require("../BaseSidebar");
const Width_1 = require("../Width");
const Margin_1 = require("../Margin");
const attachOperator = (value, operator) => typeof value === "number"
    ? operator * value
    : `${operator.toString().substr(0, 1)}${value}`;
exports.default = (config, state) => {
    const { anchor } = config;
    const { currentWidth } = BaseSidebar_1.default(config, state);
    const marginAttr = `margin${upperFirst_1.default(anchor)}`;
    const getFlexiblePersistentBehaviorMarginValue = () => {
        if (anchor === "left")
            return attachOperator(currentWidth, +1);
        if (anchor === "right")
            return attachOperator(currentWidth, -1);
        return 0;
    };
    const isBehavior = (value, objectId) => {
        if (typeof config.persistentBehavior === "object") {
            return config?.persistentBehavior?.[objectId] === value;
        }
        return config.persistentBehavior === value;
    };
    const isSidebarOpen = state?.sidebar?.[config.id]?.open;
    return {
        id: config.id,
        getObjectWidth: (objectId) => Width_1.default(isSidebarOpen && isBehavior("fit", objectId) ? currentWidth : 0),
        getObjectMargin: (objectId) => {
            const getResult = () => {
                if (!isSidebarOpen) {
                    return {
                        [marginAttr]: 0,
                    };
                }
                // open is true
                if (isBehavior("fit", objectId)) {
                    return {
                        [marginAttr]: currentWidth,
                    };
                }
                if (isBehavior("flexible", objectId)) {
                    // for flexible, only marginLeft works. You can try using marginRight.
                    // May be it is because normally browser is LTR
                    return {
                        marginLeft: getFlexiblePersistentBehaviorMarginValue(),
                    };
                }
                return { [marginAttr]: 0 };
            };
            return Margin_1.default(getResult());
        },
    };
};
//# sourceMappingURL=PersistentSidebarEffect.js.map