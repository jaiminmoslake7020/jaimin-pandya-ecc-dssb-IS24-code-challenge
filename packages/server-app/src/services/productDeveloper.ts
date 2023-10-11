import {AppDataSource} from '../data-source';
import {ProductDeveloper} from '../models/ProductDeveloper';
import {Success} from '../schema/success.schema';
import {Error} from '../schema/error.schema';
import {Product} from '../models/Product';

const getProductDeveloperRepo = () => {
    return AppDataSource.getRepository(ProductDeveloper)
}


export const getProductDevelopersByProductId = async (id: number):Promise<{developerIdList:string}|undefined> => {
    let query = getProductDeveloperRepo().createQueryBuilder('pd');
    query = query.select('GROUP_CONCAT(pd.developer_id) as developerIdList');
    query = query.where("pd.productId=:productId", {productId: Number(id)})
    query = query.groupBy("pd.productId")
    return await query.getRawOne();
}

export async function bulkInsertProductDeveloper(Developers, productId: number): Promise<void> {
    const newProductDevelopers = [] as ProductDeveloper[];
    Developers.map((s:string) => {
        const pdObj = Object.assign(new ProductDeveloper(), {
            productId: Number(productId),
            developerId: s
        });
        newProductDevelopers.push(pdObj);
    });

    const pdRepo = getProductDeveloperRepo();
    await pdRepo.createQueryBuilder().insert().values(newProductDevelopers).execute();
}

export async function bulkUpdateProductDeveloper(Developers, productId: number): Promise<void> {
    const developerExists = await getProductDevelopersByProductId(productId);
    const {
        developerIdList
    } = developerExists || {};
    const developerIdsArray = (developerIdList || '').split(',');

    const newProductDevelopers = [] as ProductDeveloper[];
    Developers.forEach((s:string) => {
        if (!developerIdsArray.includes(s)) {
            const pdObj = Object.assign(new ProductDeveloper(), {
                productId: Number(productId),
                developerId: s
            });
            newProductDevelopers.push(pdObj);
        }
    });

    try {
        developerIdsArray.forEach( async (s:string) => {
            if (!Developers.includes(s)) {
                await getProductDeveloperRepo().delete({
                    productId: productId,
                    developerId: s
                });
            }
        });
    } catch (e) {
        console.log("Error while remove getProductDeveloperRepo", e);
    }

    const pdRepo = getProductDeveloperRepo();
    await pdRepo.createQueryBuilder().insert().values(newProductDevelopers).execute();
}

export const  removeByProductId = async (productToRemove:Product):Promise<Success|Error> => {
    let deleteResult = await getProductDeveloperRepo().delete({
        productId: productToRemove.productId
    });
    console.log(`Deleted ${deleteResult.affected} product developers`);
    return {
        status: 200,
        message: "Product Developers deleted successfully"
    };
}
