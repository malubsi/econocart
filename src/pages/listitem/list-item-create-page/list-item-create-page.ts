import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ListItem } from "../../../models/class/ListItem";
import { DaoListItem } from "../../../providers/dao/dao-listitem.service";
import { Toast } from "@ionic-native/toast";
import { ListItemListPage } from "../list-item-list-page/list-item-list-page";
import { Product } from "../../../models/class/Product";
import { DaoProduct } from "../../../providers/dao/dao-product.service";

/**
 * Generated class for the ListItemCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-item-create-page',
  templateUrl: 'list-item-create-page.html',
})
export class ListItemCreatePage {
  _listItem: ListItem;
  _listProducts: Product[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alert: AlertController, private _daoListItem: DaoListItem, private _daoProduct: DaoProduct,
    private _toast: Toast) {
    this._listItem = navParams.get("parametro") || new ListItem();
    this._listItem.iListProduct = [];
    this._daoProduct.getAll().then((produtos) => {
      this._listProducts = produtos;
    });
  }


  salvar() {
    if ((typeof (this._listItem.sName) !== 'undefined') && (this._listItem.iListProduct.length > 0)) {
      if (this._listItem.nId > 0) {
        this._daoListItem.update(this._listItem).then((data) => {
          console.log("expected =>  " + data);
          if (data) {

            this._toast.show("Lista de Itens editada com sucesso", '1500', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
            this.navCtrl.setRoot(ListItemListPage);
          }
        }).catch((erro) => {
          console.log("erro =>  " + erro);
        })
      } else {
        this._daoListItem.create(this._listItem).then((data) => {
          console.log("expected =>  " + data);
          if (data) {
            this._listItem.nId = data.insertId;
            this._daoListItem.createAux(this._listItem);
            this.navCtrl.setRoot(ListItemListPage);
          }
        }).catch((erro) => {
          console.log("erro =>  " + erro);
        })
      }
      this.navCtrl.setRoot(ListItemListPage);
    } else {
      let confirm = this.alert.create({
        title: "Ops...",
        subTitle: "Por favor verifique se a lista tem um nome ou se você escolheu algum produto.",
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
