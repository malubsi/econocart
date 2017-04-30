import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { Market } from "../../../models/class/Market";
import { Toast } from "@ionic-native/toast";
import { DaoMarket } from "../../../providers/dao/dao-market.service";
import { MarketCreatePage } from "../market-create-page/market-create-page";

/**
 * Generated class for the MarketListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-market-list-page',
  templateUrl: 'market-list-page.html',
})
export class MarketListPage implements OnInit {

  ngOnInit(): void {
    this.getAllMarketts();
  }

  _markets: Market[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController,
    private _daoMarket: DaoMarket, public actionSheetCtrl: ActionSheetController,
    private _toast: Toast) {
  }

  insert() {
    this.navCtrl.push(MarketCreatePage);
  }

  ionViewDidLoad() {

  }


  getAllMarketts() {
    this._daoMarket.getAll()
      .then(markets => {
        this._markets = markets;
      })
      .catch(error => {
        console.error(error);
      });
  }

  options(market: Market) {
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
              subTitle: "Gostaria de realmente excluir o Supermercado " + market.sName + "?",
              buttons: [
                {
                  text: "Sim",
                  handler: () => {
                    let index = this._markets.indexOf(market);
                    this._daoMarket.delete(market)
                      .then(response => {
                        console.log(response);
                        this._markets.splice(index, 1);
                        this._toast.show("Supermercado excluído com sucesso", '1500', 'center').subscribe(
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
            this.navCtrl.push(MarketCreatePage, { parametro: market });
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
