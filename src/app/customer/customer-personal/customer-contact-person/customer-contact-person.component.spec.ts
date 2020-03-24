import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactPersonComponent } from './customer-contact-person.component';

describe('CustomerContactPersonComponent', () => {
  let component: CustomerContactPersonComponent;
  let fixture: ComponentFixture<CustomerContactPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContactPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
