import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListDayComponent } from './product-list-day.component';

describe('ProductListDayComponent', () => {
  let component: ProductListDayComponent;
  let fixture: ComponentFixture<ProductListDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
