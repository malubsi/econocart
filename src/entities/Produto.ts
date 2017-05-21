import { Entity,  PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { EntidadeAbstrata } from "./_entidadeAbstrata";
import { UnidadeMedida } from "./UnidadeMedida";
import { Necessidade } from "./Necessidade";


@Entity()
export class Produto extends EntidadeAbstrata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string = "";

    @ManyToOne(type => UnidadeMedida, other => other.produtos)
    unidadeMedida: UnidadeMedida = null;

    @ManyToOne(type => Necessidade, other => other.produtos)
    necessidade: Necessidade = null;
}
