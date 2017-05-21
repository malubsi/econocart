import { Column, ManyToOne } from "typeorm";
import { EntidadeAbstrata } from "./EntidadeAbstrata";
import { UnidadeMedida } from "./UnidadeMedida";
import { Necessidade } from "./Necessidade";

export class Produto extends EntidadeAbstrata {
    @Column()
    nome: string;

    @ManyToOne(type => UnidadeMedida, other => other.produtos)
    unidadeMedida: UnidadeMedida;

    @ManyToOne(type => Necessidade, other => other.produtos)
    necessidade: Necessidade;
}
