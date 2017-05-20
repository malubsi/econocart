import 'rxjs/add/operator/map';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./Product";


@Entity()
export class ListProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @OneToMany(type => Product, product => product.listItem)
    products: Product[];

}
