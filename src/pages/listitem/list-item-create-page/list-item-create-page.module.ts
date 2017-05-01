import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListItemCreatePage } from './list-item-create-page';

@NgModule({
  declarations: [
    ListItemCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ListItemCreatePage),
  ],
  exports: [
    ListItemCreatePage
  ]
})
export class ListItemCreatePageModule {}
