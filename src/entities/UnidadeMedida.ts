import { Column, OneToMany } from "typeorm";
import { EntidadeAbstrata } from "./EntidadeAbstrata";
import { Produto } from "./Produto";

export class UnidadeMedida extends EntidadeAbstrata {
    @Column()
    nome: string;

    @OneToMany(type => Produto, other => other.unidadeMedida)
    produtos: Produto[];
}
