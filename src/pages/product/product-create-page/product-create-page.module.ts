import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductCreatePage } from './product-create-page';

@NgModule({
  declarations: [
    ProductCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductCreatePage),
  ],
  exports: [
    ProductCreatePage
  ]
})
export class ProductCreatePageModule {}
