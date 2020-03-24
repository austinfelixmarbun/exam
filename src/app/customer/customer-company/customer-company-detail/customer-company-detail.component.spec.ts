import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyDetailComponent } from './customer-company-detail.component';

describe('CustomerCompanyDetailComponent', () => {
  let component: CustomerCompanyDetailComponent;
  let fixture: ComponentFixture<CustomerCompanyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
