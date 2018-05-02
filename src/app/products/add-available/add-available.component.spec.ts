import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvailableComponent } from './add-available.component';

describe('AddAvailableComponent', () => {
  let component: AddAvailableComponent;
  let fixture: ComponentFixture<AddAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
