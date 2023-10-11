"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (e) {
        return res.status(400).send(e.errors);
    }
    return true;
};
exports.default = validate;
//# sourceMappingURL=validateResource.js.map