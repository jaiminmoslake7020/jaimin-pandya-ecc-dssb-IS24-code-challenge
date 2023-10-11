import {AppDataSource} from '../data-source';
import {Error} from '../schema/error.schema'
import {Developer} from '../models/Developer';
import {CreateDeveloperInput} from '../schema/developer.schema';

const getDeveloperRepo = () => {
    return AppDataSource.getRepository(Developer)
}

export const getDevelopers = async ():Promise<Developer[]> => {
    return await getDeveloperRepo().find();
}

export const saveDeveloper = async (productInput:CreateDeveloperInput):Promise<Developer|Error> => {
    const {
        name,
    } = productInput.body;

    const product = Object.assign(new Developer(), {
        name,
    });

    return await getDeveloperRepo().save(product);
}
