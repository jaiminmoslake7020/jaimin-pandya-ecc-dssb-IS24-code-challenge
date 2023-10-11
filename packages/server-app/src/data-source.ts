import "reflect-metadata"
import { DataSource } from "typeorm"
import {Product} from './models/Product';
import {Developer} from './models/Developer';
import {ProductDeveloper} from './models/ProductDeveloper';



export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./server.sqlite",
    synchronize: true,
    logging: false,
    entities: [Product, Developer, ProductDeveloper],
    migrations: [],
    subscribers: [],
})
