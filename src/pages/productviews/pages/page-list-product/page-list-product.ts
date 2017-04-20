import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { LoadingController, ActionSheetController } from 'ionic-angular';


import { Product } from "../../../../models/class/Product";
import { ModalCadastroProduct } from "../../modal/modal-cadastro-product/modal-cadastro-product";
import { ProductService } from "../../../../service/dao-service/product.service";

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
    public alert: AlertController, public toast: ToastController,
    public actionSheetCtrl: ActionSheetController, public productService: ProductService) {
    this.products = [];
    this.ionViewLoaded();
  }
  ionViewLoaded() {
    let loader = this.loading.create({
      content: 'Carregando...',
    });

    loader.present().then(() => {
      this.productService.getAll(this.products);
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


  presentActionSheet(element: Product) {
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
              subTitle: "Gostaria de realmente excluir o produto " + element.sDescription + "?",
              buttons: [
                {
                  text: "Sim",
                  handler: () => {

                    this.productService.delete(element);
                    let index = this.products.indexOf(element);
                    this.products.splice(index, 1);
                    let toast = this.toast.create({
                      message: 'Produto excluído com sucesso',
                      duration: 2500,
                      position: 'top'
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
        },
        {
          text: 'Editar',
          role: 'edit',
          icon: 'create',
          handler: () => {
            let modal = this.modalController.create(ModalCadastroProduct, { parametro: element });
            modal.present(modal);
            modal.onDidDismiss(data => {
              if ((typeof (data) !== 'undefined') && (data !== null)) {
                this.productService.update(data);
                let toast = this.toast.create({
                  message: 'Produto editado com sucesso',
                  duration: 2500,
                  position: 'top'
                });
                toast.present();
              }
            });
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
