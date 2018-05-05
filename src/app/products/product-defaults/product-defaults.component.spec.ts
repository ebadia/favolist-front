import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDefaultsComponent } from './product-defaults.component';

describe('ProductDefaultsComponent', () => {
  let component: ProductDefaultsComponent;
  let fixture: ComponentFixture<ProductDefaultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDefaultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDefaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
