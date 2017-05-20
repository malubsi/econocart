import 'rxjs/add/operator/map';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Survey } from "./Survey";

@Entity()
export class List {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @OneToMany(type => Survey, survey => survey.list)
    surveys: Survey[];

}
