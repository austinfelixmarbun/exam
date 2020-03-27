import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyManagementShareholderComponent } from './customer-company-management-shareholder.component';

describe('CustomerCompanyManagementShareholderComponent', () => {
  let component: CustomerCompanyManagementShareholderComponent;
  let fixture: ComponentFixture<CustomerCompanyManagementShareholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyManagementShareholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyManagementShareholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
