import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, ActionSheetController } from 'ionic-angular';
import { Product } from "../../../models/class/Product";

import { Toast } from "@ionic-native/toast";
import { DaoProduct } from "../../../providers/dao/dao-product.service";
import { ProductCreatePage } from "../product-create-page/product-create-page";

/**
 * Generated class for the ProductListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-list-page',
  templateUrl: 'product-list-page.html',
})
export class ProductListPage implements OnInit {

  ngOnInit(): void {
    this.getAllProducts();
  }

  _products: Product[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController,
    private _daoProduct: DaoProduct, public actionSheetCtrl: ActionSheetController,
    private _toast: Toast) {
  }

  insert() {
    this.navCtrl.push(ProductCreatePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }


  getAllProducts() {
    this._daoProduct.getAll()
      .then(products => {
        this._products = products;
      })
      .catch(error => {
        console.error(error);
      });
  }

  options(product: Product) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha uma das opções abaixo:',
      buttons: [
        {
          text: 'Deletar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            let confirm = this.alert.create({
              title: "Excluir",
              subTitle: "Gostaria de realmente excluir o Produto " + product.sName + "?",
              buttons: [
                {
                  text: "Sim",
                  handler: () => {
                    let index = this._products.indexOf(product);
                    this._daoProduct.delete(product)
                      .then(response => {
                        console.log(response);
                        this._products.splice(index, 1);
                        this._toast.show("Produto excluído com sucesso", '1500', 'center').subscribe(
                          toast => {
                            console.log(toast);
                          }
                        );
                      })
                      .catch(error => {
                        console.error(error);
                      })

                  }
                },
                {
                  text: "Não"
                }
              ]
            });
            confirm.present();
          }
        },
        {
          text: 'Editar',
          role: 'edit',
          icon: 'create',
          handler: () => {
            this.navCtrl.push(ProductCreatePage, { parametro: product });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
          handler: () => {

          }
        }
      ]
    });

    actionSheet.present();
  }

}
