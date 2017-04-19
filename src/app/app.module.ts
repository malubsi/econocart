import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { SocialSharing } from "@ionic-native/social-sharing";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SocialSharingService } from "../service/socialsharing/socialsharingservice";
import { StarterService } from "../service/starter-service/starter.service";
import { UnitService } from "../service/dao-service/unit.service";
import { PageListUnit } from "../pages/unitviews/pages/page-list-unit";
import { ModalCadastroUnit } from "../pages/unitviews/modals/modal-cadastro-unit/modal-cadastro-unit";
import { PageListProduct } from "../pages/productviews/pages/page-list-product/page-list-product";
import { ModalCadastroProduct } from "../pages/productviews/modal/modal-cadastro-product/modal-cadastro-product";



@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    PageListUnit,
    ModalCadastroUnit, PageListProduct, ModalCadastroProduct
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    PageListUnit,
    ModalCadastroUnit, PageListProduct, ModalCadastroProduct
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    SocialSharingService, StarterService, UnitService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
