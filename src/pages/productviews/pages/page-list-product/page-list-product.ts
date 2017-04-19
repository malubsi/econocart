import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Toast, ToastController, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


import { Product } from "../../../../models/class/Product";
import { ModalCadastroProduct } from "../../modal/modal-cadastro-product/modal-cadastro-product";

/*
  Generated class for the PageListProduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-product',
  templateUrl: 'page-list-product.html'
})
export class PageListProduct {
  products: Product[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loading: LoadingController, public modalController: ModalController,
    public alert: AlertController, public toast: ToastController) {

    this.products = [];
    this.ionViewLoaded();
  }
  ionViewLoaded() {
    let loader = this.loading.create({
      content: 'Carregando...',
    });

    loader.present().then(() => {
      // this.unitService.getAll(this.units);
      loader.dismiss();
    });
  }

  insert(element: Product) {
    let modal = this.modalController.create(ModalCadastroProduct);
    modal.present(modal);
    modal.onDidDismiss(data => {
      if ((typeof (data) !== 'undefined') && (data !== null)) {
        this.products.push(data);
      }
    });
  }

  edit(element: Product) {
    let modal = this.modalController.create(ModalCadastroProduct, { parametro: element });
    modal.present(modal);
    modal.onDidDismiss(data => {
      if ((typeof (data) !== 'undefined') && (data !== null)) {
        // this.unitService.update(data);
      }
    });
  }
  delete(element: Product) {
    let confirm = this.alert.create({
      title: "Excluir",
      subTitle: "Gostaria de realmente excluir a unidade " + element.sDescription + "?",
      buttons: [
        {
          text: "Sim",
          handler: () => {

            // this.unitService.delete(element);
            let index = this.products.indexOf(element);
            this.products.splice(index, 1);
            let toast = this.toast.create({
              message: 'Matéria excluída com sucesso',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
        },
        {
          text: "Não"
        }
      ]
    });
    confirm.present();
  }

}
