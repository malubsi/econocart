export interface Dao<T>{
    criar(): T;
    salvar(dado: T): Promise<T>;
    apagar(dado: T): Promise<T>;
    listar(): Promise<T[]>;
    obterId(id: number): Promise<T[]>;
    recarregar(inst: T): Promise<T[]>;
}
