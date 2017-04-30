import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Product } from "../../../models/class/Product";
import { Toast } from "@ionic-native/toast";
import { DaoProduct } from "../../../providers/dao/dao-product.service";
import { ProductListPage } from "../product-list-page/product-list-page";

/**
 * Generated class for the ProductCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-create-page',
  templateUrl: 'product-create-page.html',
})
export class ProductCreatePage {
  _product: Product;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alert: AlertController, private _daoProduct: DaoProduct,
    private _toast: Toast) {
    this._product = navParams.get("parametro") || new Product();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductCreatePage');
  }
  salvar() {
    if ((typeof (this._product.sName) !== 'undefined')) {
      if (this._product.nId > 0) {
        this._daoProduct.update(this._product).then((data) => {
          console.log("expected =>  " + data);
          if (data) {
            this._toast.show("Produto editado com sucesso", '1500', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
            this.navCtrl.setRoot(ProductListPage);
          }
        }).catch((erro) => {
          console.log("erro =>  " + erro);
        })
      } else {
        this._daoProduct.create(this._product).then((data) => {
          console.log("expected =>  " + data);
          if (data) {
            this.navCtrl.setRoot(ProductListPage);
          }
        }).catch((erro) => {
          console.log("erro =>  " + erro);
        })
      }
      this.navCtrl.setRoot(ProductListPage);
    } else {
      let confirm = this.alert.create({
        title: "Ops...",
        subTitle: "Por favor coloque um nome para o Produto.",
        buttons: [
          {
            text: "OK",
            handler: () => {
            }
          }
        ]
      });
      confirm.present();
    }
  }

}
