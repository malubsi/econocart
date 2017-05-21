import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { CrudService } from '../../providers/_crudService';

export abstract class PageForm<T> {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
    ){
        this.editing = navParams.get('sujeito');
        this.crud = navParams.get('crud');
        this.selectables = navParams.get('selecionaveis');
    }
    public editing: T;
    public crud: CrudService<T>;
    public selectables: {[id: string]: any[];};
    public selectablesFor(id: string): any[]{
        return this.selectables[id];
    }
    public save(){
        for(let fieldIndex in this.fields){
            this.editing[this.fields[fieldIndex]['entity']] = this.fields[fieldIndex]['data']
            if(this.fields[fieldIndex]['verifywith'] === 'length'){
                if(this.fields[fieldIndex]['data'].length<=0){
                    this.toastCtrl.create({
                        message: "Falha na validação",
                        duration: 1500,
                        position: 'top'
                    }).present();
                    return
                }
            }
            if(this.fields[fieldIndex]['verifywith'] === 'truthy'){
                if(this.fields[fieldIndex]['data']){}else{
                    this.toastCtrl.create({
                        message: "Falha na validação",
                        duration: 1500,
                        position: 'top'
                    }).present();
                    return
                }
            }
        }
        this.crud.salvar(this.editing).then(()=>{
            this.navCtrl.pop()
        })
    }
    public abstract textOption(field: string, item: any): string;
    public abstract titulo: string;
    public abstract fields: object[];
}
