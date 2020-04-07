import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalAddressCheckComponent } from './customer-personal-address-check.component';

describe('CustomerPersonalAddressCheckComponent', () => {
  let component: CustomerPersonalAddressCheckComponent;
  let fixture: ComponentFixture<CustomerPersonalAddressCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPersonalAddressCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalAddressCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
