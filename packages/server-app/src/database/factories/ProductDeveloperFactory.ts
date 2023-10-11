import * as Faker from 'faker';
import {define} from 'typeorm-seeding';
import {ProductDeveloper} from '../../models/ProductDeveloper';

define(ProductDeveloper, (faker: typeof Faker, settings: { role: string }) => {
    return new ProductDeveloper();
});
