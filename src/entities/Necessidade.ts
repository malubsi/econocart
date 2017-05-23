import { Entity,  PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { EntidadeAbstrata } from "./_entidadeAbstrata";
import { Produto } from "./Produto";
import { Consulta } from "./Consulta";
import { Planejamento } from "./Planejamento";

@Entity()
export class Necessidade extends EntidadeAbstrata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    quantidade: number = 0;

    @Column()
    satisfeita: boolean = false;

    @ManyToOne(type => Produto, other => other.necessidades)
    produto: Produto = null;

    @OneToMany(type => Consulta, other => other.necessidade)
    consultas: Consulta[] = [];

    @ManyToOne(type => Planejamento, other => other.necessidades)
    planejamento: Planejamento = null;
}
