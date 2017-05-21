import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageFormUnidadeMedida } from './main';

let fixture: ComponentFixture<PageFormUnidadeMedida> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: Forms: UnidadeMedida', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([PageFormUnidadeMedida]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the page', async(() => {
        expect(instance).toBeTruthy();
    }));
});
