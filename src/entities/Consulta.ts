import { Entity,  PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from "typeorm";
import { EntidadeAbstrata } from "./_entidadeAbstrata";
import { Necessidade } from "./Necessidade";
import { Supermercado } from "./Supermercado";


@Entity()
export class Consulta extends EntidadeAbstrata {
    @PrimaryGeneratedColumn()
    id: number;

    @UpdateDateColumn()
    modificacao: Date = new Date();

    @Column('float')
    preco: number = 0;

    @ManyToOne(type => Necessidade, other => other.consultas)
    necessidade: Necessidade = null;

    @ManyToOne(type => Supermercado, other => other.consultas)
    supermercado: Supermercado = null;
}
