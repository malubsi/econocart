import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketCreatePage } from './market-create-page';

@NgModule({
  declarations: [
    MarketCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(MarketCreatePage),
  ],
  exports: [
    MarketCreatePage
  ]
})
export class MarketCreatePageModule {}
