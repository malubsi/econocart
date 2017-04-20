import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Product } from "../../../../models/class/Product";
import { ProductService } from "../../../../service/dao-service/product.service";


/*
  Generated class for the ModalAtividades page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'modal-cadastro-product',
    templateUrl: 'modal-cadastro-product.html'
})
export class ModalCadastroProduct {

    private product: Product;

    constructor(public viewCtrl: ViewController, public navCtrl: NavController,
        public navParams: NavParams, public loading: LoadingController, public productService: ProductService) {
        this.product = navParams.get("parametro") || new Product();
    }

    cancel() {
        this.viewCtrl.dismiss(null);
    }

    salvar() {
        if ((typeof (this.product.sDescription) !== 'undefined')) {
            if (this.product.nId > 0) {
                this.productService.update(this.product);
            } else {
                this.productService.create(this.product);
            }
            this.viewCtrl.dismiss(this.product);
        } else {
            alert("Por favor coloque uma sigla para a unidade.");
        }
    }

}

