import { Column, ManyToOne } from "typeorm";
import { EntidadeAbstrata } from "./EntidadeAbstrata";
import { Necessidade } from "./Necessidade";
import { Supermercado } from "./Supermercado";

export class Consulta extends EntidadeAbstrata {
    @Column()
    modificacao: Date;

    @Column('float')
    preco: number;

    @ManyToOne(type => Necessidade, other => other.consultas)
    necessidade: Necessidade;

    @ManyToOne(type => Supermercado, other => other.consultas)
    supermercado: Supermercado;
}
