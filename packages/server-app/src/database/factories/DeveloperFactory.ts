import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Developer } from '../../models/Developer';

define(Developer, (faker: typeof Faker, settings: { role: string }) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);

    const developer = new Developer();
    developer.name = firstName+" "+lastName;
    return developer;
});
