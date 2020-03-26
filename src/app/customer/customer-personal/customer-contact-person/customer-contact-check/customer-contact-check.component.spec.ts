import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactCheckComponent } from './customer-contact-check.component';

describe('CustomerContactCheckComponent', () => {
  let component: CustomerContactCheckComponent;
  let fixture: ComponentFixture<CustomerContactCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContactCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContactCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
