import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { Product } from './Product';

let fixture: ComponentFixture<Product> = null;
let instance: any = null;

declare var describe: any;
declare var it: any;
declare var expect: any;
declare var beforeEach: any;

describe('Model: Product', () => {

    beforeEach(async(() => {
        instance = new Product();
    }));

    it('should create the start page', async(() => {
        expect(instance).toBeTruthy();
    }));

});
