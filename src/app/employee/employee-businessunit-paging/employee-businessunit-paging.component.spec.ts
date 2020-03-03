import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBusinessunitPagingComponent } from './employee-businessunit-paging.component';

describe('EmployeeBusinessunitPagingComponent', () => {
  let component: EmployeeBusinessunitPagingComponent;
  let fixture: ComponentFixture<EmployeeBusinessunitPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBusinessunitPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBusinessunitPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
