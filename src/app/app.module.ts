import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
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
import { SQLjsObject, SQLjs } from "../providers/SQLjsDriver/SQLjs.service";
import { DaoUnit } from "../providers/dao/dao-unit.service";
import { StartService } from "../providers/start/start-service.service";
import { DaoProduct } from "../providers/dao/dao-product.service";
import { ProductCreatePageModule } from "../pages/product/product-create-page/product-create-page.module";
import { ProductListPageModule } from "../pages/product/product-list-page/product-list-page.module";
import { MarketListPage } from "../pages/market/market-list-page/market-list-page";
import { MarketCreatePage } from "../pages/market/market-create-page/market-create-page";
import { MarketCreatePageModule } from "../pages/market/market-create-page/market-create-page.module";
import { MarketListPageModule } from "../pages/market/market-list-page/market-list-page.module";
import { DaoMarket } from "../providers/dao/dao-market.service";
import { ListItemListPageModule } from "../pages/listitem/list-item-list-page/list-item-list-page.module";
import { DaoListItem } from "../providers/dao/dao-listitem.service";
import { ListItemCreatePageModule } from "../pages/listitem/list-item-create-page/list-item-create-page.module";


@NgModule({
  declarations: [
    MyApp, HomePage,
  ],
  imports: [
    BrowserModule, IonicModule.forRoot(MyApp), UnitListPageModule, HttpModule, ListItemListPageModule,ListItemCreatePageModule,
    UnitCreateModule, ProductListPageModule, ProductCreatePageModule, MarketListPageModule, MarketCreatePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, HomePage,],
  providers: [
    StatusBar, SplashScreen, ActionSheet, DaoUnit, StartService, SQLite, Toast, DaoProduct, DaoMarket, DaoListItem, SQLjs, SQLjsObject,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
