import { Component, OnInit } from '@angular/core';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';


import { Unit } from "../../../models/class/Unit";
import { UnitCreate } from "../unit-create/unit-create";
import { DaoUnit } from "../../../providers/dao/dao-unit.service";

/**
 * Generated class for the UnitListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unit-list-page',
  templateUrl: 'unit-list-page.html',
})
export class UnitListPage implements OnInit {

  _units: Unit[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheet: ActionSheet, public alert: AlertController,
    private _daoUnit: DaoUnit, public actionSheetCtrl: ActionSheetController,
    private _toast: Toast) {
  }

  ionViewDidLoad() {

  }

  ngOnInit() {
    this.getAllUnits();
  }
  insert() {
    this.navCtrl.push(UnitCreate);
  }


  getAllUnits() {
    this._daoUnit.getAll()
      .then(units => {
        this._units = units;
      })
      .catch(error => {
        console.error(error);
      });
  }



  options(unit: Unit) {
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
              subTitle: "Gostaria de realmente excluir a unidade " + unit.sInitials + "?",
              buttons: [
                {
                  text: "Sim",
                  handler: () => {
                    let index = this._units.indexOf(unit);
                    this._daoUnit.delete(unit)
                      .then(response => {
                        console.log(response);
                        this._units.splice(index, 1);
                        this._toast.show("Unidade excluída com sucesso", '1500', 'center').subscribe(
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
            this.navCtrl.push(UnitCreate, { parametro: unit });
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
