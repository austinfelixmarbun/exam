import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyPageXComponent } from './customer-company-page-x.component';

describe('CustomerCompanyPageXComponent', () => {
  let component: CustomerCompanyPageXComponent;
  let fixture: ComponentFixture<CustomerCompanyPageXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyPageXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyPageXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
