"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNil_1 = require("./isNil");
const isNilOrEmpty = (value) => {
    return isNil_1.default(value) || value === "";
};
exports.default = isNilOrEmpty;
//# sourceMappingURL=isNilOrEmpty.js.map