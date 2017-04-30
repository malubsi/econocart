import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnitListPage } from './unit-list-page';

@NgModule({
  declarations: [
    UnitListPage,
  ],
  imports: [
    IonicPageModule.forChild(UnitListPage),
  ],
  exports: [
    UnitListPage
  ]
})
export class UnitListPageModule {}
