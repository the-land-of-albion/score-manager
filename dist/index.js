"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const path = require("path");
const dotenv = require("dotenv");
const PDotEnv = path.join(path.dirname(__dirname), ".env");
console.log(PDotEnv);
dotenv.config({ path: PDotEnv });
client_1.default.start();
//# sourceMappingURL=index.js.map