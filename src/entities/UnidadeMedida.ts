import { Entity,  PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EntidadeAbstrata } from "./_entidadeAbstrata";
import { Produto } from "./Produto";



@Entity()
export class UnidadeMedida extends EntidadeAbstrata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string = "";

    @OneToMany(type => Produto, other => other.unidadeMedida)
    produtos: Produto[] = [];
}
