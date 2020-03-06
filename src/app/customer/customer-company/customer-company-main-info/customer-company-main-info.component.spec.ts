import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyMainInfoComponent } from './customer-company-main-info.component';

describe('CustomerCompanyMainInfoComponent', () => {
  let component: CustomerCompanyMainInfoComponent;
  let fixture: ComponentFixture<CustomerCompanyMainInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyMainInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyMainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
