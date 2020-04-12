"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Builder_1 = require("./Builder");
describe("Layout Builder", () => {
    it("able to configure header", () => {
        const layout = Builder_1.default();
        layout.configureHeader(h => {
            h.createConfig("xs", {
                id: "header",
                position: "sticky",
                clipped: true,
            });
        });
    });
});
//# sourceMappingURL=Builder.spec.js.map