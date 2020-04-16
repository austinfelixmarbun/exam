import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerCompanyPageComponent } from './customer-company-page.component';

describe('CustomerCompanyPageComponent', () => {
  let component: CustomerCompanyPageComponent;
  let fixture: ComponentFixture<CustomerCompanyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCompanyPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
