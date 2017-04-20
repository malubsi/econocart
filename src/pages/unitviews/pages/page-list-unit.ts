import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { LoadingController, ActionSheetController } from 'ionic-angular';
import { Unit } from "../../../models/class/Unit";
import { UnitService } from "../../../service/dao-service/unit.service";
import { ModalCadastroUnit } from "../modals/modal-cadastro-unit/modal-cadastro-unit";

/*
  Generated class for the Materias page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-list-unit',
    templateUrl: 'page-list-unit.html'
})
export class PageListUnit {

    units: Unit[];
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public unitService: UnitService, public loading: LoadingController,
        public modalController: ModalController, public alert: AlertController,
        public toast: ToastController, public actionSheetCtrl: ActionSheetController) {
        this.units = [];
        this.ionViewLoaded();
    }
    ionViewLoaded() {
        let loader = this.loading.create({
            content: 'Carregando...',
        });

        loader.present().then(() => {
            this.unitService.getAll(this.units);
            loader.dismiss();
        });
    }

    insert(element: Unit) {
        let modal = this.modalController.create(ModalCadastroUnit);
        modal.present(modal);
        modal.onDidDismiss(data => {
            if ((typeof (data) !== 'undefined') && (data !== null)) {
                this.units.push(data);
                let toast = this.toast.create({
                    message: 'Unidade criada com sucesso',
                    duration: 2500,
                    position: 'top'
                });
                toast.present();
            }
        });
    }

    presentActionSheet(element: Unit) {
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
                            subTitle: "Gostaria de realmente excluir a unidade " + element.sInitials + "?",
                            buttons: [
                                {
                                    text: "Sim",
                                    handler: () => {

                                        this.unitService.delete(element);
                                        let index = this.units.indexOf(element);
                                        this.units.splice(index, 1);
                                        let toast = this.toast.create({
                                            message: 'Unidade excluída com sucesso',
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
                        let modal = this.modalController.create(ModalCadastroUnit, { parametro: element });
                        modal.present(modal);
                        modal.onDidDismiss(data => {
                            if ((typeof (data) !== 'undefined') && (data !== null)) {
                                this.unitService.update(data);
                                let toast = this.toast.create({
                                    message: 'Unidade editada com sucesso',
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
