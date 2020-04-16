import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerCompanyManagementShareholderCheckComponent } from './customer-company-management-shareholder-check.component';

describe('CustomerCompanyManagementShareholderCheckComponent', () => {
  let component: CustomerCompanyManagementShareholderCheckComponent;
  let fixture: ComponentFixture<CustomerCompanyManagementShareholderCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyManagementShareholderCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyManagementShareholderCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
