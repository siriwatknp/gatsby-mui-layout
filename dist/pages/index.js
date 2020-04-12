"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const components_1 = require("../package/components");
const Builder_1 = require("../package/core/Builder");
const IndexPage = () => {
    const scheme = Builder_1.default();
    scheme.configureHeader(h => h.createConfig("xs", {
        id: "header",
        position: "fixed",
        clipped: true,
    }));
    scheme.configureSidebar(s => s.createPersistentSidebarConfig("sm", {
        id: "primary-sidebar",
        anchor: "left",
        width: 256,
        persistentBehavior: "fit",
        collapsible: true,
        collapsedWidth: 80,
    }));
    return (react_1.default.createElement(components_1.Root, { scheme: scheme },
        react_1.default.createElement(components_1.Header, null, "Hello")));
};
exports.default = IndexPage;
//# sourceMappingURL=index.js.map