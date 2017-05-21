import { Column, ManyToMany, OneToMany } from "typeorm";
import { EntidadeAbstrata } from "./EntidadeAbstrata";
import { Necessidade } from "./Necessidade";
import { Supermercado } from "./Supermercado";

export class Planejamento extends EntidadeAbstrata {
    @Column()
    nome: string;

    @Column()
    criacao: Date;

    @Column()
    modificacao: Date;

    @OneToMany(type => Necessidade, other => other.planejamento)
    necessidades: Necessidade[];

    @ManyToMany(type => Supermercado, other => other.planejamentos)
    supermercados: Supermercado[];
}
