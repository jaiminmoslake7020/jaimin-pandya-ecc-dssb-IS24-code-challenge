import * as Faker from 'faker';
import {define} from 'typeorm-seeding';

import {MethodologyData, Product} from '../../models/Product';

export const getName = (faker: typeof Faker) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    return firstName+" "+lastName;
}

define(Product, (faker: typeof Faker, settings: { role: string }) => {
    const productName = faker.commerce.productName();
    const companyName = faker.company.companyName();
    const product = new Product();
    product.productName = productName;
    product.startDate = faker.date.past();
    product.productOwnerName = companyName;
    product.scrumMasterName = getName(faker);
    product.methodology = MethodologyData[faker.random.number(1)];
    const url = faker.lorem.word();
    product.location = "https://github.com/bcgov/"+url;
    return product;
});
