import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Market } from "../../../models/class/Market";
import { DaoMarket } from "../../../providers/dao/dao-market.service";
import { Toast } from "@ionic-native/toast";
import { MarketListPage } from "../market-list-page/market-list-page";

/**
 * Generated class for the MarketCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-market-create-page',
  templateUrl: 'market-create-page.html',
})
export class MarketCreatePage {
  _market: Market;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alert: AlertController, private _daoMarket: DaoMarket,
    private _toast: Toast) {
    this._market = navParams.get("parametro") || new Market();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad marketCreatePage');
  }
  salvar() {
    if ((typeof (this._market.sName) !== 'undefined')) {
      if (this._market.nId > 0) {
        this._daoMarket.update(this._market).then((data) => {
          console.log("expected =>  " + data);
          if (data) {
            this._toast.show("Supermercado editado com sucesso", '1500', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
            this.navCtrl.setRoot(MarketListPage);
          }
        }).catch((erro) => {
          console.log("erro =>  " + erro);
        })
      } else {
        this._daoMarket.create(this._market).then((data) => {
          console.log("expected =>  " + data);
          if (data) {
            this.navCtrl.setRoot(MarketListPage);
          }
        }).catch((erro) => {
          console.log("erro =>  " + erro);
        })
      }
      this.navCtrl.setRoot(MarketListPage);
    } else {
      let confirm = this.alert.create({
        title: "Ops...",
        subTitle: "Por favor coloque um nome para o Supermercado.",
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
