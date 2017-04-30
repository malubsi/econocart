import { SQLiteObject } from '@ionic-native/sqlite';

export interface IDao {


    db: SQLiteObject;
    setDatabase(db: SQLiteObject);

    create(element: any);

    createTable();

    delete(element: any)

    getAll(elements: any);

    update(element: any);

}

