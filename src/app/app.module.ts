import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { Toast } from "@ionic-native/toast";
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { UnitCreateModule } from "../pages/unit/unit-create/unit-create.module";

import { UnitListPageModule } from "../pages/unit/unit-list-page/unit-list-page.module";




import { SQLite } from "@ionic-native/sqlite";
import { DaoUnit } from "../providers/dao/dao-unit.service";
import { StartService } from "../providers/start/start-service.service";
import { DaoProduct } from "../providers/dao/dao-product.service";
import { ProductCreatePageModule } from "../pages/product/product-create-page/product-create-page.module";
import { ProductListPageModule } from "../pages/product/product-list-page/product-list-page.module";


@NgModule({
  declarations: [
    MyApp, HomePage, ListPage,
  ],
  imports: [
    BrowserModule, IonicModule.forRoot(MyApp), UnitListPageModule, HttpModule, UnitCreateModule, ProductListPageModule, ProductCreatePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage, ListPage
  ],
  providers: [
    StatusBar, SplashScreen, ActionSheet, DaoUnit, StartService, SQLite, Toast, DaoProduct,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
