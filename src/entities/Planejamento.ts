import { Entity,  PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { EntidadeAbstrata } from "./_entidadeAbstrata";
import { Necessidade } from "./Necessidade";
import { Supermercado } from "./Supermercado";


@Entity()
export class Planejamento extends EntidadeAbstrata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string = "";

    @CreateDateColumn()
    criacao: Date = new Date();

    @UpdateDateColumn()
    modificacao: Date = new Date();

    @OneToMany(type => Necessidade, other => other.planejamento)
    necessidades: Necessidade[] = [];

    @ManyToMany(type => Supermercado, other => other.planejamentos)
    @JoinTable()
    supermercados: Supermercado[] = [];
}
