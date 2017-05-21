import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ActionSheet } from '@ionic-native/action-sheet';
import { Toast } from "@ionic-native/toast";
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { PageInicio } from '../pages/inicio/main';
import { PageListaUnidadeMedida } from '../pages/ListaUnidadeMedida/main';
import { PageFormUnidadeMedida } from '../pages/FormUnidadeMedida/main';

import { OrmDatabase } from '../persistence/OrmDatabase.service';
import { Relatorios } from '../providers/Relatorios.service';
import { CrudUnidadeMedida } from '../providers/CrudUnidadeMedida.service';

@NgModule({
    declarations: [
        MyApp,
        PageInicio,
        PageListaUnidadeMedida,
        PageFormUnidadeMedida,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
    ],
    bootstrap: [
        IonicApp
    ],
    entryComponents: [
        MyApp,
        PageInicio,
        PageListaUnidadeMedida,
        PageFormUnidadeMedida,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ActionSheet,
        Toast,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        OrmDatabase,
        Relatorios,
        CrudUnidadeMedida,
    ]
})
export class AppModule { }
