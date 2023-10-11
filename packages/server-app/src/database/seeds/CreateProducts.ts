import { Factory, Seeder, times } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Product } from '../../models/Product';
import { Developer } from '../../models/Developer';
import { ProductDeveloper } from '../../models/ProductDeveloper';
import * as faker from 'faker';

export default class CreateProducts implements Seeder {

    // @ts-ignore
    public async run(factory: Factory, connection:Connection): Promise<void> {
        // console.log('CreateProducts');
        // await factory(Product)().seedMany(10);

        const totalNumOfDevelopers = 100;
        const developerList = [] as Developer[];
        await times(totalNumOfDevelopers, async (n) => {
            const developer = await factory(Developer)().create();
            developerList.push(developer);
        });

        const em = connection.createEntityManager();
        await times(40, async (n) => {
            const product = await factory(Product)().create();

            const numOfDevelopers = faker.random.number(4);
            await times(numOfDevelopers+1, async (n) => {
                const currentDeveloper = faker.random.number(totalNumOfDevelopers - 1);
                const productDeveloper = await factory(ProductDeveloper)().make();
                productDeveloper.product = product;
                productDeveloper.developerItem = developerList[currentDeveloper];

                await em.save(productDeveloper);
            });

            return product;
        });
    }

}
