import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageFormCompras } from './main';

let fixture: ComponentFixture<PageFormCompras> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Forms: Compras', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageFormCompras]).then(compiled => {
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
        expect(instance.textOption('supermercados',{nome:'asd'})).toBe('asd');
    }));
});
