import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Unit } from "../../../models/class/Unit";
import { UnitListPage } from "../unit-list-page/unit-list-page";
import { DaoUnit } from "../../../providers/dao/dao-unit.service";
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the UnitCreate page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unit-create',
  templateUrl: 'unit-create.html',
})
export class UnitCreate {
  _unit: Unit;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alert: AlertController, private _daoUnit: DaoUnit,
    private _toast: Toast) {
    this._unit = navParams.get("parametro") || new Unit();
  }


  salvar() {
    if ((typeof (this._unit.sInitials) !== 'undefined')) {
      if (this._unit.nId > 0) {
        this._daoUnit.update(this._unit).then((data) => {
          console.log("expected =>  " + data);
          if (data) {
            this._toast.show("Unidade editada com sucesso", '1500', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
            this.navCtrl.setRoot(UnitListPage);
          }
        }).catch((erro) => {
          console.log("erro =>  " + erro);
        })
      } else {
        this._daoUnit.create(this._unit).then((data) => {
          console.log("expected =>  " + data);
          if (data) {
            this.navCtrl.setRoot(UnitListPage);
          }
        }).catch((erro) => {
          console.log("erro =>  " + erro);
        })
      }
      this.navCtrl.setRoot(UnitListPage);
    } else {
      let confirm = this.alert.create({
        title: "Ops...",
        subTitle: "Por favor coloque uma sigla para a unidade.",
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
