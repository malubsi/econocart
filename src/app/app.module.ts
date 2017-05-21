import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PageInicio } from '../pages/inicio/main';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ActionSheet } from '@ionic-native/action-sheet';
import { Toast } from "@ionic-native/toast";
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { SQLite } from "@ionic-native/sqlite";
import { SQLjsObject, SQLjs } from "../providers/SQLjsDriver/SQLjs.service";

@NgModule({
    declarations: [
        MyApp, PageInicio,
    ],
    imports: [
        BrowserModule, IonicModule.forRoot(MyApp), HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp, PageInicio,
    ],
    providers: [
        StatusBar, SplashScreen, ActionSheet, SQLite, Toast, SQLjs, SQLjsObject,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
