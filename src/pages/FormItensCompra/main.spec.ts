import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageFormItensCompra } from './main';

let fixture: ComponentFixture<PageFormItensCompra> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Forms: Item de compra', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageFormItensCompra]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
    }));

    it('should display a text option', async(() => {
        expect(instance.textOption('unmapped','')).toBe('');
        expect(instance.textOption('unmapped',null)).toBe('');
        expect(instance.textOption(null,null)).toBe('');
        expect(instance.textOption('produto',{nome:'asd'})).toBe('asd');
    }));

    it('should save', async(() => {
        expect(()=>{instance.save()}).toThrow(new TypeError("Cannot read property '_getPortal' of undefined"));
    }));
});
