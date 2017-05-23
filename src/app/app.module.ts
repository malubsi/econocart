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
import { PageListaProduto } from '../pages/ListaProduto/main';
import { PageFormProduto } from '../pages/FormProduto/main';
import { PageListaSupermercado } from '../pages/ListaSupermercado/main';
import { PageFormSupermercado } from '../pages/FormSupermercado/main';
import { PageListaCompras } from '../pages/ListaCompras/main';
import { PageFormCompras } from '../pages/FormCompras/main';
import { PageListaItensCompra } from '../pages/ListaItensCompra/main';

import { OrmDatabase } from '../persistence/OrmDatabase.service';
import { Relatorios } from '../providers/Relatorios.service';
import { CrudUnidadeMedida } from '../providers/CrudUnidadeMedida.service';
import { CrudProduto } from '../providers/CrudProduto.service';
import { CrudConsulta } from '../providers/CrudConsulta.service';
import { CrudNecessidade } from '../providers/CrudNecessidade.service';
import { CrudPlanejamento } from '../providers/CrudPlanejamento.service';
import { CrudSupermercado } from '../providers/CrudSupermercado.service';

@NgModule({
    declarations: [
        MyApp,
        PageInicio,
        PageListaUnidadeMedida,
        PageFormUnidadeMedida,
        PageListaProduto,
        PageFormProduto,
        PageListaSupermercado,
        PageFormSupermercado,
        PageListaCompras,
        PageFormCompras,
        PageListaItensCompra,
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
        PageListaProduto,
        PageFormProduto,
        PageListaSupermercado,
        PageFormSupermercado,
        PageListaCompras,
        PageFormCompras,
        PageListaItensCompra,
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
        CrudProduto,
        CrudConsulta,
        CrudNecessidade,
        CrudPlanejamento,
        CrudSupermercado,
    ]
})
export class AppModule { }
