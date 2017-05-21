import { Entity,  PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { EntidadeAbstrata } from "./_entidadeAbstrata";
import { Planejamento } from "./Planejamento";
import { Consulta } from "./Consulta";


@Entity()
export class Supermercado extends EntidadeAbstrata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string = "";

    @ManyToMany(type => Planejamento, other => other.supermercados)
    planejamentos: Planejamento[] = [];

    @OneToMany(type => Consulta, other => other.supermercado)
    consultas: Consulta[] = [];
}
