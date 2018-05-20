import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDayComponent } from './stock-day.component';

describe('StockDayComponent', () => {
  let component: StockDayComponent;
  let fixture: ComponentFixture<StockDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
