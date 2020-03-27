import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerCompanyContactInformationComponent } from './customer-company-contact-information.component';

describe('CustomerCompanyContactInformationComponent', () => {
  let component: CustomerCompanyContactInformationComponent;
  let fixture: ComponentFixture<CustomerCompanyContactInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyContactInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyContactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
