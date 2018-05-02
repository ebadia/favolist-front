import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableEditComponent } from './available-edit.component';

describe('AvailableEditComponent', () => {
  let component: AvailableEditComponent;
  let fixture: ComponentFixture<AvailableEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
