import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyManagementShareholderPersonalComponent } from './customer-company-management-shareholder-personal.component';

describe('CustomerCompanyManagementShareholderPersonalComponent', () => {
  let component: CustomerCompanyManagementShareholderPersonalComponent;
  let fixture: ComponentFixture<CustomerCompanyManagementShareholderPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyManagementShareholderPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyManagementShareholderPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
