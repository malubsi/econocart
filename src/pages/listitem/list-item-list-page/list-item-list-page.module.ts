import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListItemListPage } from './list-item-list-page';

@NgModule({
  declarations: [
    ListItemListPage,
  ],
  imports: [
    IonicPageModule.forChild(ListItemListPage),
  ],
  exports: [
    ListItemListPage
  ]
})
export class ListItemListPageModule {}
