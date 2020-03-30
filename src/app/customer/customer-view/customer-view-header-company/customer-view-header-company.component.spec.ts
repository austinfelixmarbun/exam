import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewHeaderCompanyComponent } from './customer-view-header-company.component';

describe('CustomerViewHeaderCompanyComponent', () => {
  let component: CustomerViewHeaderCompanyComponent;
  let fixture: ComponentFixture<CustomerViewHeaderCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerViewHeaderCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewHeaderCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
