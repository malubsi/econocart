import { OrmDatabase, Repository } from '../persistence/OrmDatabase.service';

export abstract class CrudService<T>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
    }

    abstract getType():any;

    abstract criar(): T;

    salvar(dado: T): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.ormDatabase.getConnection().then(
                connection => {
                    let repo = connection.getRepository(this.getType());
                    repo.persist(dado).then(resolve,reject);
                },
                reject
            )
        });
    }
    apagar(dado: T): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.ormDatabase.getConnection().then(
                connection => {
                    let repo = connection.getRepository(this.getType());
                    repo.remove(dado).then(resolve,reject);
                },
                reject
            )
        });
    }
    abstract _listar(repository: Repository<T>): Promise<T[]>;
    listar(): Promise<T[]>{
        return new Promise<any>((resolve, reject) => {
            this.ormDatabase.getConnection().then(
                connection => {
                    let repo = connection.getRepository(this.getType());
                    this._listar(<Repository<T>>repo).then(resolve,reject);
                },
                reject
            )
        });
    }
}
