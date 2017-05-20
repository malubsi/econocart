import 'rxjs/add/operator/map';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Item } from "./Item";
import { Market } from "./Market";

@Entity()
export class Survey {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    description: string;

    @OneToMany(type => Item , item => item.survey)
    items: Item[];

    @ManyToOne(type => Market, market => market.surveys)
    market: Market;

}
