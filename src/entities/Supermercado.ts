import { Column, ManyToMany, OneToMany } from "typeorm";
import { EntidadeAbstrata } from "./EntidadeAbstrata";
import { Planejamento } from "./Planejamento";
import { Consulta } from "./Consulta";

export class Supermercado extends EntidadeAbstrata {
    @Column()
    nome: string;

    @ManyToMany(type => Planejamento, other => other.supermercados)
    planejamentos: Planejamento[];

    @OneToMany(type => Consulta, other => other.supermercado)
    consultas: Consulta[];
}
