/* tslint:disable */
// IONIC:
import { EventEmitter}      from '@angular/core';
import { FormBuilder }      from '@angular/forms';

export class AlertMock {

    public create(): any {
        let rtn: Object = {};
        rtn['present'] = (() => true);
        return rtn;
    }

    // function actually on the AlertClass (not AlertController), but using these interchangably for now
    public dismiss(): Promise<{}> {
        return new Promise(function(resolve: Function): void {
            resolve();
        });
    }
}

export class ToastMock {

    public create(): any {
        let rtn: Object = {};
        rtn['present'] = (() => true);
        return rtn;
    }
}

export class ConfigMock {

    public get(): any {
        return '';
    }

    public getBoolean(): boolean {
        return true;
    }

    public getNumber(): number {
        return 1;
    }

    public setTransition(): void {
        return;
    }
}

export class FormMock {
    public register(): any {
        return true;
    }
}

export class NavMock {

    public pop(): any {
        return new Promise(function(resolve: Function): void {
            resolve();
        });
    }

    public push(): any {
        return new Promise(function(resolve: Function): void {
            resolve();
        });
    }

    public getActive(): any {
        return {
            'instance': {
                'model': 'something',
            },
        };
    }

    public setRoot(): any {
        return true;
    }

    public popToRoot(): any {
        return true;
    }
}

export class PlatformMock {
    public ready(): Promise<{String}> {
        return new Promise((resolve) => {
            resolve('READY');
        });
    }

    public registerBackButtonAction(fn: Function, priority?: number): Function {
        return (() => true);
    }

    public hasFocus(ele: HTMLElement): boolean {
        return true;
    }

    public doc(): HTMLDocument {
        return document;
    }

    public is(): boolean {
        return true;
    }

    public getElementComputedStyle(container: any): any {
        return {
            paddingLeft: '10',
            paddingTop: '10',
            paddingRight: '10',
            paddingBottom: '10',
        };
    }

    public onResize(callback: any) {
        return callback;
    }

    public registerListener(ele: any, eventName: string, callback: any): Function {
        return (() => true);
    }

    public win(): Window {
        return window;
    }

    public raf(callback: any): number {
        return 1;
    }

    public timeout(callback: any, timer: number): any {
        return setTimeout(callback, timer);
    }

    public cancelTimeout(id: any) {
        // do nothing
    }

    public getActiveElement(): any {
        return document['activeElement'];
    }
}

export class SplashMock {

    public hide() {
        return Promise.resolve(true);
    }
}

export class StatusMock {

    public styleDefault() {
        return Promise.resolve(true);
    }
}

export class MenuMock {
    public close(): any {
        return new Promise((resolve: Function) => {
            resolve();
        });
    }
}

export class AppMock {

    public getActiveNav(): NavMock {
        return new NavMock();
    }
}

export class NavParamsMock{
    public get(key:string){
        return new Array();
    }
}

export interface SQLmockDatabaseConfig {
    name: string;
    location?: string;
    iosDatabaseLocation?: string;
}

export class SQLmock {
    create(config: SQLmockDatabaseConfig): Promise<SQLmock>{
        return new Promise<any>((resolve, reject) => {
            reject("mock");
        });
    }
    echoTest(): Promise<any>{
        return;
    }
    deleteDatabase(config: SQLmockDatabaseConfig): Promise<any>{
        return;
    }
}

export class SQLmockObject {
    _objectInstance: any;
    databaseFeatures: any;
    constructor(){
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
            resolve({
                rows: new SQLjsRows([]),
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

export class SQLjsRows {
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

export class daomock{
    public createTable():Promise<any>{
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    };
    public create(element: any):Promise<any>{
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    };
    public update(element: any):Promise<any>{
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    };
    public delete(element: any):Promise<any>{
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    };
    public deleteById(id: number):Promise<any>{
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    };
    public getAll():Promise<any>{
        return new Promise<any>((resolve, reject) => {
            resolve([]);
        });
    };
    public getById(id: number):Promise<any>{
        return new Promise<any>((resolve, reject) => {
            resolve({});
        });
    };
}

export class ActionSheetControllerMock {
    create(s:any){
        return {present: ()=>true, dismiss: ()=>true}
    }
}

/* tslint:enable */
