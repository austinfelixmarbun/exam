import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactAddComponent } from './customer-contact-add.component';

describe('CustomerContactAddComponent', () => {
  let component: CustomerContactAddComponent;
  let fixture: ComponentFixture<CustomerContactAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerContactAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerContactAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
