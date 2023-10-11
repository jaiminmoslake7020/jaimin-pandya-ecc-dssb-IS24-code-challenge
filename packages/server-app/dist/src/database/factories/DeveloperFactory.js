"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const Developer_1 = require("../../models/Developer");
(0, typeorm_seeding_1.define)(Developer_1.Developer, (faker, settings) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const developer = new Developer_1.Developer();
    developer.name = firstName + " " + lastName;
    return developer;
});
//# sourceMappingURL=DeveloperFactory.js.map