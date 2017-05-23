export interface Dao<T>{
    criar(): T;
    salvar(dado: T): Promise<T>;
    apagar(dado: T): Promise<T>;
    listar(): Promise<T[]>;
    obterId(id: number): Promise<T>;
    recarregarUm(inst: T): Promise<T>;
    obterIds(ids: number[]): Promise<T[]>;
    recarregarAlguns(insts: T[]): Promise<T[]>;
}
