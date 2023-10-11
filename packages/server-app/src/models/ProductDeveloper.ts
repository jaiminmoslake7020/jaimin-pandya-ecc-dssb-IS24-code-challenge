import { IsNotEmpty } from 'class-validator';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Developer} from './Developer';
import {Product} from './Product';

@Entity()
export class ProductDeveloper {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column({
        name: 'product_id',
        nullable: false,
    })
    public productId: number;

    @ManyToOne(type => Product, product => product.Developers)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @IsNotEmpty()
    @Column({
        name: 'developer_id',
        nullable: false,
    })
    public developerId: string;

    @ManyToOne(type => Developer, developerItem => developerItem.Products)
    @JoinColumn({ name: 'developer_id' })
    public developerItem: Developer;

    public toString(): string {
        return `${this.id}`;
    }

}
