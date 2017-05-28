import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';
import { Toast } from "@ionic-native/toast";
import { CrudService } from '../../providers/_crudService';

export abstract class PageListacolapsavel<E,I>{
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public alert: AlertController,
        public toast: Toast,
        public loadingCtrl: LoadingController,
        public crudExterno: CrudService<E>,
        public crudInterno: CrudService<I>,
    ){
    }
    public mostraCarregando(){
        this.initialLoad = this.loadingCtrl.create({ content: 'Carregando...' }); this.initialLoad.present();
    }
    public escondeCarregando(){
        this.initialLoad.dismiss()
    }
    public contextoExibe: object = {
        excluir: true,
        editar: true,
        personalizado: [],
    };
    ionViewWillEnter(){
        this.refreshList();
    }
    externosMonitorados: E[] = [];
    abstract beforeRefreshList():Promise<any>;
    refreshList(){
        this.mostraCarregando();
        this.beforeRefreshList().then(()=>{
            let externoLista: Promise<E[]>;
            if(this.externosMonitorados.length==0){
                externoLista = this.crudExterno.listar();
            }else{
                externoLista = this.crudExterno.recarregarAlguns(this.externosMonitorados)
            }
            externoLista.then(
                (lista: E[]) => {
                    let recuperar: I[] = new Array<I>()
                    for(let item of lista){
                        for(let interno of <I[]>item[this.itemField]){
                            recuperar.push(interno)
                        }
                    }
                    this.crudInterno.recarregarAlguns(recuperar).then( (internos: I[]) => {
                        for(let indiceExterno in lista){
                            for(let indiceInterno in <I[]>lista[indiceExterno][this.itemField]){
                                for(let interno of internos){
                                    if (lista[indiceExterno][this.itemField][indiceInterno]['id'] == interno['id']){
                                        lista[indiceExterno][this.itemField][indiceInterno] = interno
                                    }
                                }
                            }
                        }
                        this.items = this.ordenaExibicaoExterno(lista);
                        for(let indiceExterno in this.items){
                            if(this.items[indiceExterno]['id']>0){
                                this.items[indiceExterno][this.itemField] = this.ordenaExibicaoInterno(this.items[indiceExterno][this.itemField]);
                            }
                        }
                        this.escondeCarregando()
                    })
                }
            );
        });
    }
    public items: Array<E>;
    public initialLoad: Loading;
    public abstract textos: object;
    // public abstract iconeE: string;
    public abstract iconeI: string;
    public abstract itemField: string;
    public abstract textoExterno(item: E):string;
    public abstract textoInterno(item: I):string;
    public abstract posTextoExterno(item: E):string;
    public abstract posTextoInterno(item: I):string;
    // public abstract abreEdicaoExterno(item: E):void;
    // public abstract abreEdicaoInterno(item: I):void;
    public abstract ordenaExibicaoExterno(items: E[]):E[];
    public abstract ordenaExibicaoInterno(items: I[]):I[];
    // public addE():void{
    //     this.abreEdicaoExterno(this.crudExterno.criar());
    // };
    // public addI():void{
    //     this.abreEdicaoInterno(this.crudInterno.criar());
    // };
    // public getClicadoExterno():E{
    //     return this.clicadoExterno;
    // }
    // public clicadoExterno: E;
    // public clickExterno(item: E):void{
    //     return;
    // };
    public collapsed: number[] = [];
    public collapse(item: E):void{
        if(this.isCollapsed(item)){
            this.collapsed.splice(this.collapsed.indexOf(item['id']),1)
        }else{
            this.collapsed.push(item['id'])
        }
    };
    public isCollapsed(item: E):boolean{
        return this.collapsed.indexOf(item['id']) != -1
    }
    // public getClicadoInterno():I{
    //     return this.clicadoInterno;
    // }
    // public clicadoInterno: I;
    public abstract clickInterno(item: I):void;
    public getSubitems(item: E):I[]{
        return item[this.itemField]
    }
}
