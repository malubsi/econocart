import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { UnitService } from "../../../../service/dao-service/unit.service";
import { Unit } from "../../../../models/class/Unit";

/*
  Generated class for the ModalAtividades page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'modal-cadastro-unit',
    templateUrl: 'modal-cadastro-unit.html'
})
export class ModalCadastroUnit {

    private unit: Unit;

    constructor(public viewCtrl: ViewController, public navCtrl: NavController,
        public navParams: NavParams, public unitService: UnitService, public loading: LoadingController) {
        this.unit = navParams.get("parametro") || new Unit();
    }

    cancel() {
        this.viewCtrl.dismiss(null);
    }

    salvar() {
        if (this.unit.sInitials != "") {
            if (this.unit.nId > 0) {
                this.unitService.update(this.unit);
            } else {
                this.unitService.create(this.unit);
            }
            this.viewCtrl.dismiss(this.unit);
        } else {
            alert("Por favor coloque uma sigla para a unidade.");
        }
    }

}

