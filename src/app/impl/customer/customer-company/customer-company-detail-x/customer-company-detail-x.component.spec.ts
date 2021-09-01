import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyDetailXComponent } from './customer-company-detail-x.component';

describe('CustomerCompanyDetailXComponent', () => {
  let component: CustomerCompanyDetailXComponent;
  let fixture: ComponentFixture<CustomerCompanyDetailXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyDetailXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyDetailXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
