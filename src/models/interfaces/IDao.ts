import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export interface IDao {

    db: SQLite;
    storage: SQLiteObject;

    create(element: any);

    createTable();

    delete(element: any)

    getAll(elements: any);

    openDatabase();

    update(elemten: any);

}