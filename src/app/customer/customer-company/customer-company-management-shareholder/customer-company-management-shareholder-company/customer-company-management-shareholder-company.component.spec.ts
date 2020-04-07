import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerCompanyManagementShareholderCompanyComponent } from './customer-company-management-shareholder-company.component';

describe('CustomerCompanyManagementShareholderCompanyComponent', () => {
  let component: CustomerCompanyManagementShareholderCompanyComponent;
  let fixture: ComponentFixture<CustomerCompanyManagementShareholderCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyManagementShareholderCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyManagementShareholderCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
