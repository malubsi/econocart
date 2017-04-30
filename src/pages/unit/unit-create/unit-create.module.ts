import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnitCreate } from './unit-create';

@NgModule({
  declarations: [
    UnitCreate,
  ],
  imports: [
    IonicPageModule.forChild(UnitCreate),
  ],
  exports: [
    UnitCreate
  ]
})
export class UnitCreateModule {}
