import 'rxjs/add/operator/map';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Unit } from "./Unit";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Product, product => product.items)
    product: Product;

    @ManyToOne(type => Unit, unit => unit.items)
    unit: Unit;

    @Column("real")
    amount: number;

    @Column("real")
    price: number;

}
