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
    public moveDataToEditableZone():void{
        for(let fieldIndex in this.fields){
            this.fields[fieldIndex]['data'] = this.editing[this.fields[fieldIndex]['entity']]
        }
    }
    public updateSelectableFields():void{
        for(let field of this.fields){
            if(field['type'] == 'select'){
                for(let fieldIndex in this.fields){
                    let saved = this.fields[fieldIndex]['data']
                    let avail = this.selectablesFor(field['entity'])
                    if(saved && saved.id){
                        for(let placeable of avail){
                            if(placeable.id == saved.id){
                                this.fields[fieldIndex]['data'] = placeable
                            }
                        }
                    }
                }
            }
            if(field['type'] == 'selectmultiple'){
                for(let fieldIndex in this.fields){
                    let saveds = this.fields[fieldIndex]['data']
                    let avail = this.selectablesFor(field['entity'])
                    for(let savi in saveds){
                        if(saveds[savi] && saveds[savi].id){
                            for(let placeable of avail){
                                if(placeable.id == saveds[savi].id){
                                    this.fields[fieldIndex]['data'][savi] = placeable
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    public postSuper():void{
        this.moveDataToEditableZone();
        this.updateSelectableFields();
    }
    public selectables: {[id: string]: any[];};
    public selectablesFor(id: string): any[]{
        return this.selectables[id];
    }
    public validate():boolean{
        for(let fieldIndex in this.fields){
            if(this.fields[fieldIndex]['verifywith'] === 'length'){
                if(!this.fields[fieldIndex]['data'].hasOwnProperty('length') || this.fields[fieldIndex]['data'].length<=0){
                    return false
                }
            }
            if(this.fields[fieldIndex]['verifywith'] === 'truthy'){
                if(this.fields[fieldIndex]['data']){}else{
                    return false
                }
            }
            if(this.fields[fieldIndex]['verifywith'] === 'gtz'){
                if(parseFloat(this.fields[fieldIndex]['data']) > 0){}else{
                    return false
                }
            }
        }
        return true
    }
    public save(){
        if(!this.validate()){
            this.toastCtrl.create({
                message: "Falha na validação",
                duration: 1500,
                position: 'top'
            }).present();
            return
        }
        for(let fieldIndex in this.fields){
            this.editing[this.fields[fieldIndex]['entity']] = this.fields[fieldIndex]['data']
        }
        this.crud.salvar(this.editing).then(()=>{
            this.navCtrl.pop()
        })
    }
    public abstract textOption(field: string, item: any): string;
    public abstract titulo: string;
    public abstract fields: object[];
}
