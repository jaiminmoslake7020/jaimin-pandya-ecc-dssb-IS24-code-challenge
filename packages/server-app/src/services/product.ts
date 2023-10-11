import {AppDataSource} from '../data-source';
import {Product} from '../models/Product';
import {Error} from '../schema/error.schema'
import {ObjectLiteral} from 'typeorm';
import {CreateProductInput, DeleteProductInput, UpdateProductInput} from '../schema/product.schema';
import {bulkInsertProductDeveloper, bulkUpdateProductDeveloper, removeByProductId} from './productDeveloper';
import {Success} from '../schema/success.schema';

const getProductRepo = () => {
    return AppDataSource.getRepository(Product)
}


export const getProducts = async (where: string, whereArgs: ObjectLiteral):Promise<Product[]> => {
    let query = getProductRepo().createQueryBuilder('product');
    query = query.select('product.*, GROUP_CONCAT(d.name) as DevelopersString, GROUP_CONCAT(d.id) as DeveloperIdsString ');
    query = query.innerJoin('product_developer', 'pd', 'pd.product_id=productId')
    query = query.innerJoin('developer', 'd', 'd.id=pd.developer_id')
    query = query.where(where, whereArgs)
    query = query.groupBy("product.productId")
    const result = await query.getRawMany();
    return result.map((d) => ({...d, Developers:d.DevelopersString.split(','), DeveloperIds: d.DeveloperIdsString.split(',') }));
}


export const getProductById = async (id:number): Promise<Product|Error> => {
    const result = await getProducts("product.productId=:productId", {productId: id});
    if (
        result.length === 0 ||
        result[0].productId !== Number(id)
    ) {
        return {
            status: 404,
            message: "Product not found."
        };
    }
    return result[0];
}



export const saveProduct = async (productInput:CreateProductInput):Promise<Product|Error> => {
    const {
        productName,
        productOwnerName,
        methodology,
        scrumMasterName,
        startDate,
        location,
        Developers
    } = productInput.body;

    const product = Object.assign(new Product(), {
        productName,
        productOwnerName,
        methodology,
        scrumMasterName,
        startDate,
        location
    });

    const saveProduct = await getProductRepo().save(product);
    const productId = saveProduct.productId;
    await bulkInsertProductDeveloper(Developers, productId);

    return await getProductById(productId);
}


export const updateProduct = async (productInput:UpdateProductInput):Promise<Product|Error> => {
    const { id } = productInput.params;
    const oldProduct = await getProductRepo().findOneBy({
        productId: Number(id)
    });
    if (!oldProduct) {
        return  {
            status: 404,
            message: "Product not found."
        };
    }
    const {
        productName,
        productOwnerName,
        methodology,
        scrumMasterName,
        startDate,
        location,
        Developers
    } = productInput.body;

    const product = Object.assign(oldProduct, {
        productName,
        productOwnerName,
        methodology,
        scrumMasterName,
        startDate,
        location
    });

    const saveProduct = await getProductRepo().save(product);
    const productId = saveProduct.productId;
    await bulkUpdateProductDeveloper(Developers, productId);

    return await getProductById(productId);
}


export const  deleteProduct = async (productInput:DeleteProductInput):Promise<Success|Error> => {
    const id = productInput.params.id
    let productToRemove = await getProductRepo().findOneBy({ productId:Number(id) })

    if (!productToRemove) {
        return  {
            status: 404,
            message: "Product not found."
        };
    }
    await removeByProductId(productToRemove);
    await getProductRepo().remove(productToRemove)
    return {
        status: 200,
        message: "Product deleted successfully"
    };
}
