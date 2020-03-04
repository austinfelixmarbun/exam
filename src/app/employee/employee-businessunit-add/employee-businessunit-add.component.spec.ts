import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBusinessunitAddComponent } from './employee-businessunit-add.component';

describe('EmployeeBusinessunitAddComponent', () => {
  let component: EmployeeBusinessunitAddComponent;
  let fixture: ComponentFixture<EmployeeBusinessunitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBusinessunitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBusinessunitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
