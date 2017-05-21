import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { PageInicio } from './main';

let fixture: ComponentFixture<PageInicio> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: PageInicio', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([PageInicio]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

    it('should have a clickable button to another page', async(() => {
        expect(instance.openPage()).toBeTruthy();
    }));
});
