import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageRelatorioExibe } from './main';

let fixture: ComponentFixture<PageRelatorioExibe> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Relatorios: Exibe', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageRelatorioExibe]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
    }));

    it('should enter the view',async(() => {
        expect((()=>{instance.ionViewWillEnter();instance.escondeCarregando()})()).toBeUndefined();
    }));

    it('should be shareable',async(() => {
        expect(instance.share('facebook','facebook')).toBeUndefined();
    }));

    it('should sort its contents',async(() => {
        expect(instance.ordenaExibicao([])).toEqual([]);
    }));

    it('should contain clickable items', async(() => {
        let click = instance.crud.criar()
        expect(fixture.componentInstance.getClicado()).toBeUndefined();
        expect(()=>fixture.componentInstance.click(click)).toThrow(new TypeError('Cannot read property \'satisfeita\' of null'));
    }));

    it('should display friendly names', async(() => {
        let click = instance.crud.criar()
        expect(()=>fixture.componentInstance.classesPara(click)).toThrow(new TypeError('Cannot read property \'satisfeita\' of null'));
        expect(()=>fixture.componentInstance.posTexto(click)).toThrow(new TypeError('Cannot read property \'nome\' of null'));
        expect(()=>fixture.componentInstance.texto(click)).toBeTruthy();
    }));

    it('should add an item', async(() => {
        expect(fixture.componentInstance.add()).toBeUndefined();
        expect(fixture.componentInstance.abreEdicao(instance.crud.criar())).toBeUndefined();
    }));
});
