"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const CreateProducts_1 = require("./CreateProducts");
const data_source_1 = require("../../data-source");
function seed() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        data_source_1.AppDataSource.initialize().then(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            typeorm_seeding_1.factory.useSeeder(Seeder);
            yield (0, typeorm_seeding_1.runSeeder)(CreateProducts_1.CreateProducts).run();
        }));
    });
}
seed().catch(console.error);
//# sourceMappingURL=index.js.map