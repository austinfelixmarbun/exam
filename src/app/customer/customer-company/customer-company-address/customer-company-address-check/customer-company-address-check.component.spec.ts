import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyAddressCheckComponent } from './customer-company-address-check.component';

describe('CustomerCompanyAddressCheckComponent', () => {
  let component: CustomerCompanyAddressCheckComponent;
  let fixture: ComponentFixture<CustomerCompanyAddressCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyAddressCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyAddressCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
