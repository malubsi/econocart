import { SQLiteObject, SQLite, SQLiteDatabaseConfig } from "@ionic-native/sqlite";
import { Injectable } from '@angular/core';

declare var SQL:any;

@Injectable()
export class SQLjs extends SQLite {
    create(config: SQLiteDatabaseConfig): Promise<SQLiteObject>{
        return;
    }
    echoTest(): Promise<any>{
        return super.echoTest();
    }
    deleteDatabase(config: SQLiteDatabaseConfig): Promise<any>{
        return;
    }
}

@Injectable()
export class SQLjsObject extends SQLiteObject {
    _objectInstance: any;
    databaseFeatures: any;
    constructor(){
        super(undefined);
        this._objectInstance = new SQL.Database();
    }
    addTransaction(transaction: any): void{
        return;
    }
    transaction(fn: any): Promise<any>{
        return;
    }
    readTransaction(fn: any): Promise<any>{
        return;
    }
    startNextTransaction(): void{
        return;
    }
    close(): Promise<any>{
        return;
    }
    start(): void{
        return;
    }
    executeSql(statement: string, params: any): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            let stmt = this._objectInstance.prepare(statement, params);
            let lines = new Array();
            while(stmt.step()){
                let columnNames: Array<string> = stmt.getColumnNames()
                let linePlain = stmt.get()
                let lineAssoc: {[id: string]:object;} = {}
                for(let columnNumber = 0; columnNumber < columnNames.length; columnNumber++){
                    lineAssoc[columnNames[columnNumber]] = linePlain[columnNumber]
                }
                lines.push(lineAssoc);
            }
            resolve({
                rows: new SQLjsRows(lines),
            });
        });
    }
    addStatement(sql: any, values: any): Promise<any>{
        return;
    }
    sqlBatch(sqlStatements: any): Promise<any>{
        return;
    }
    abortallPendingTransactions(): void{
        return;
    }
    handleStatementSuccess(handler: any, response: any): void{
        return;
    }
    handleStatementFailure(handler: any, response: any): void{
        return;
    }
    run(): void{
        return;
    }
    abort(txFailure: any): void{
        return;
    }
    finish(): void{
        return;
    }
    abortFromQ(sqlerror: any): void{
        return;
    }
}

class SQLjsRows {
    private _lines:Array<object>;
    constructor(lines:Array<object>){
        this._lines = lines;
    }
    public get length():number{
        return this._lines.length;
    }
    item(ndx: number):object{
        if(ndx>=0 && ndx<this._lines.length){
            return this._lines[ndx];
        }else{
            throw new RangeError("Index is out of the range of the list.");
        }
    }
    public get array():Array<object>{
        return this._lines;
    }
}
