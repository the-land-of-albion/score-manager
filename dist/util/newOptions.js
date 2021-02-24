"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsBuilder = void 0;
const common_1 = require("@bothaven/common");
console.log(process.env.AUTH);
exports.optionsBuilder = new common_1.OptionsBuilder({
    "Authorization": "Bearer " + process.env.AUTH,
    "Content-Type": "application/json",
    "Accepts": "application/json",
    "credentials": "include",
    "User-Agent": `discord ${process.env.AUTH} / node-fetch`
});
exports.default = exports.optionsBuilder;
//# sourceMappingURL=newOptions.js.map