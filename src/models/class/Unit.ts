import 'rxjs/add/operator/map';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Unit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    initials: string;

}
