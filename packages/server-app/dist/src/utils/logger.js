"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pino_1 = tslib_1.__importDefault(require("pino"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const log = (0, pino_1.default)({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${(0, dayjs_1.default)().format()}"`,
});
exports.default = log;
//# sourceMappingURL=logger.js.map