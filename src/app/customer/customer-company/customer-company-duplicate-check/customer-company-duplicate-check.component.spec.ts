import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyDuplicateCheckComponent } from './customer-company-duplicate-check.component';

describe('CustomerCompanyDuplicateCheckComponent', () => {
  let component: CustomerCompanyDuplicateCheckComponent;
  let fixture: ComponentFixture<CustomerCompanyDuplicateCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompanyDuplicateCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyDuplicateCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
