import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { HomePage } from './home';

let fixture: ComponentFixture<HomePage> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Pages: HomePage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([HomePage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
    })));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));
});
