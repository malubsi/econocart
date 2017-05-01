import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { ListItem } from "../../../models/class/ListItem";
import { Toast } from "@ionic-native/toast";
import { DaoListItem } from "../../../providers/dao/dao-listitem.service";
import { ListItemCreatePage } from "../list-item-create-page/list-item-create-page";

/**
 * Generated class for the ListItemListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-item-list-page',
  templateUrl: 'list-item-list-page.html',
})
export class ListItemListPage implements OnInit {

  ngOnInit(): void {
    this.getAllListItem();
  }

  _listItem: ListItem[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController,
    private _daoListItem: DaoListItem, public actionSheetCtrl: ActionSheetController,
    private _toast: Toast) {
  }

  insert() {
    this.navCtrl.push(ListItemCreatePage);
  }

  ionViewDidLoad() {

  }


  getAllListItem() {
    this._daoListItem.getAll()
      .then(listItem => {
        this._listItem = listItem;
      })
      .catch(error => {
        console.error(error);
      });
  }

  options(listItem: ListItem) {
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
              subTitle: "Gostaria de realmente excluir a Lista de Itens " + listItem.sName + "?",
              buttons: [
                {
                  text: "Sim",
                  handler: () => {
                    let index = this._listItem.indexOf(listItem);
                    this._daoListItem.delete(listItem)
                      .then(response => {
                        console.log(response);
                        this._daoListItem.deleteAux(listItem);
                        this._listItem.splice(index, 1);
                        this._toast.show("Lista de Itens excluído com sucesso", '1500', 'center').subscribe(
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
        /* {
           text: 'Editar',
           role: 'edit',
           icon: 'create',
           handler: () => {
             this.navCtrl.push(ListItemCreatePage, { parametro: listItem });
           }
         },*/
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
