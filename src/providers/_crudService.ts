import { OrmDatabase, Repository, QueryBuilder } from '../persistence/OrmDatabase.service';
import { Dao } from './_dao'

export abstract class CrudService<T> implements Dao<T>{
    constructor(
        public ormDatabase: OrmDatabase
    ){
    }

    abstract criar(): T;

    abstract _getType(): any;

    abstract _ordena(query: QueryBuilder<T>): QueryBuilder<T>;

    abstract _seleciona(repository: Repository<T>): QueryBuilder<T>;

    salvar(dado: T): Promise<T>{
        return new Promise<T>((resolve, reject) => {
            this.ormDatabase.getConnection().then(
                connection => {
                    let repo = connection.getRepository(this._getType());
                    repo.persist(
                        dado
                    ).then(resolve,reject);
                },
                reject
            )
        });
    }
    apagar(dado: T): Promise<T>{
        return new Promise<T>((resolve, reject) => {
            this.ormDatabase.getConnection().then(
                connection => {
                    let repo = connection.getRepository(this._getType());
                    repo.remove(
                        dado
                    ).then(resolve,reject);
                },
                reject
            )
        });
    }
    listar(): Promise<T[]>{
        return new Promise<any>((resolve, reject) => {
            this.ormDatabase.getConnection().then(
                connection => {
                    let repo = connection.getRepository(this._getType());
                    this._ordena(
                        this._seleciona(
                            <Repository<T>>repo
                        )
                    ).getMany(
                    ).then(resolve,reject);
                },
                reject
            )
        });
    }
    obterId(id: number): Promise<T>{
        return new Promise<any>((resolve, reject) => {
            this.ormDatabase.getConnection().then(
                connection => {
                    let repo = connection.getRepository(this._getType());
                    this._ordena(
                        this._seleciona(
                            <Repository<T>>repo
                        ).where(
                            "tbl.id = :id",
                            {
                                'id': id
                            }
                        )
                    ).getOne(
                    ).then(resolve,reject);
                },
                reject
            )
        });
    }
    recarregarUm(inst: T): Promise<T>{
        return new Promise<any>((resolve, reject) => {
            if(inst['id']){
                this.obterId(
                    inst['id']
                ).then(resolve,reject)
                return
            }else{
                reject()
                return
            }
        })
    }
    obterIds(ids: number[]): Promise<T[]>{
        return new Promise<any>((resolve, reject) => {
            this.ormDatabase.getConnection().then(
                connection => {
                    let repo = connection.getRepository(this._getType());
                    this._ordena(
                        this._seleciona(
                            <Repository<T>>repo
                        ).andWhereInIds /* função experimental não documentada */ (
                            ids
                        )
                    ).getMany(
                    ).then(resolve,reject);
                },
                reject
            )
        });
    }
    recarregarAlguns(insts: T[]): Promise<T[]>{
        return new Promise<any>((resolve, reject) => {
            let ids: number[] = new Array<number>();
            for(let inst of insts){
                if(inst['id']){
                    ids.push(inst['id']);
                }
            }
            this.obterIds(ids).then(resolve,reject)
        })
    }
}
