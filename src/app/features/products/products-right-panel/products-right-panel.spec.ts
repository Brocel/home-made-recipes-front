import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRightPanel } from './products-right-panel';

describe('ProductsRightPanel', () => {
  let component: ProductsRightPanel;
  let fixture: ComponentFixture<ProductsRightPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsRightPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsRightPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
