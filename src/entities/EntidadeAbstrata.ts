import {Entity,  PrimaryGeneratedColumn} from "typeorm";

@Entity()
export abstract class EntidadeAbstrata {
    @PrimaryGeneratedColumn()
    id: number;
}
