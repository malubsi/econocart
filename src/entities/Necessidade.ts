import { Column, ManyToOne, OneToMany } from "typeorm";
import { EntidadeAbstrata } from "./EntidadeAbstrata";
import { Produto } from "./Produto";
import { Consulta } from "./Consulta";
import { Planejamento } from "./Planejamento";

export class Necessidade extends EntidadeAbstrata {
    @Column('float')
    quantidade: number;

    @Column()
    satisfeita: boolean;

    @OneToMany(type => Produto, other => other.necessidade)
    produtos: Produto[];

    @OneToMany(type => Consulta, other => other.necessidade)
    consultas: Consulta[];

    @ManyToOne(type => Planejamento, other => other.necessidades)
    planejamento: Planejamento;
}
