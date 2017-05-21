import { Entity,  PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { EntidadeAbstrata } from "./_entidadeAbstrata";
import { Necessidade } from "./Necessidade";
import { Supermercado } from "./Supermercado";


@Entity()
export class Planejamento extends EntidadeAbstrata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string = "";

    @Column()
    criacao: Date = new Date();

    @Column()
    modificacao: Date = new Date();

    @OneToMany(type => Necessidade, other => other.planejamento)
    necessidades: Necessidade[] = [];

    @ManyToMany(type => Supermercado, other => other.planejamentos)
    @JoinTable()
    supermercados: Supermercado[] = [];
}
