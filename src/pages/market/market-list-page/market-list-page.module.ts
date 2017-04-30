import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketListPage } from './market-list-page';

@NgModule({
  declarations: [
    MarketListPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketListPage),
  ],
  exports: [
    MarketListPage
  ]
})
export class MarketListPageModule {}
