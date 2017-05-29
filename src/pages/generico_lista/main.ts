import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { CrudService } from '../../providers/_crudService';
import { SocialSharingService } from "../../providers/SocialSharing.service";

export abstract class PageLista<T> {
    constructor(
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public alert: AlertController,
        public toast: Toast,
        public loadingCtrl: LoadingController,
        public crud: CrudService<T>,
        public socialSharingService?: SocialSharingService
    ) {
    }
    public mostraCarregando() {
        this.initialLoad = this.loadingCtrl.create({ content: 'Carregando...' }); this.initialLoad.present();
    }
    public escondeCarregando() {
        this.initialLoad.dismiss()
    }
    public contextoExibe: object = {
        excluir: true,
        editar: true,
        personalizado: [],
    };
    ionViewWillEnter() {
        this.refreshList();
    }
    refreshList() {
        this.mostraCarregando(); this.crud.listar().then(lista => {
            this.items = this.ordenaExibicao(lista); if (this.isChoice) {
            } this.escondeCarregando()
        });
    }
    public socialMedia: String[];
    public isChoice: boolean = false;
    public initialLoad: Loading;
    public abstract textos: object;
    public abstract icone: string;
    public abstract items: Array<T>;
    public abstract texto(item: T): string;
    public abstract posTexto(item: T): string;
    public abstract abreEdicao(item: T): void;
    public abstract ordenaExibicao(items: T[]): T[];
    public classesPara(item: T): string { return '' }
    public add(): void {
        this.abreEdicao(this.crud.criar());
    };
    public getClicado(): T {
        return this.clicado;
    }
    public clicado: T;
    public share(body: string) {
        this.socialSharingService.share(body);
    }

    public click(item: T): void {
        this.clicado = item;
        let self = this;
        let botoes = new Array<any>();
        let botaoEditar = {
            text: 'Editar',
            role: 'edit',
            icon: 'create',
            handler: () => { self.abreEdicao(item); }
        }
        let botaoCancelaExclusao = {
            text: "Não"
        }
        let botaoConfirmaExclusao = {
            text: "Sim",
            handler: () => {
                self.mostraCarregando()
                self.crud.apagar(item)
                    .then(() => {
                        self.escondeCarregando()
                        this.toast.show(
                            self.textos['capitalEntidade'] + " excluíd" + self.textos['entidadeGenero'] + " com sucesso",
                            '1500',
                            'center'
                        )
                        self.refreshList();
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        }
        let botaoExcluir = {
            text: 'Deletar',
            role: 'destructive',
            icon: 'trash',
            cssClass: "deleteToast",
            handler: () => {
                let confirm = this.alert.create({
                    title: "Excluir",
                    subTitle: "Gostaria de realmente excluir " + self.textos['artigoentidade'] + " " + self.texto(item) + "?",
                    buttons: [
                        botaoConfirmaExclusao,
                        botaoCancelaExclusao
                    ]
                });
                confirm.present();
            }
        }
        let botaoCancelar = {
            text: 'Cancelar',
            role: 'cancel',
            icon: 'close',
            cssClass: "cancelToast",
            handler: () => { }
        }
        if (this.contextoExibe['editar']) { botoes.push(botaoEditar) };
        for (let personalizado of this.contextoExibe['personalizado']) { botoes.push(personalizado) };
        if (this.contextoExibe['excluir']) { botoes.push(botaoExcluir) };
        if (botoes.length == 0) {
            return
        }
        botoes.push(botaoCancelar)
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Escolha uma das opções abaixo:',
            buttons: botoes
        })
        actionSheet.present();
        return;
    };
}
