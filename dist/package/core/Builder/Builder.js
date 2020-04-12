"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HeaderBuilder_1 = require("./Header/HeaderBuilder");
const SidebarBuilder_1 = require("./Sidebar/SidebarBuilder");
exports.default = () => {
    const header = HeaderBuilder_1.default();
    const sidebar = SidebarBuilder_1.default();
    return {
        configureHeader(callback) {
            callback(header);
        },
        configureSidebar(callback) {
            callback(sidebar);
        },
        getComponentStyle: (state) => ({
            header: header.getResultStyle(state, sidebar),
        }),
    };
};
//# sourceMappingURL=Builder.js.map