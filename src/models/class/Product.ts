import 'rxjs/add/operator/map';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    items: Item;
}
