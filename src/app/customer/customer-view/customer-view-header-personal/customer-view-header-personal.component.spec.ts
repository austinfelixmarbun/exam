import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewHeaderPersonalComponent } from './customer-view-header-personal.component';

describe('CustomerViewHeaderPersonalComponent', () => {
  let component: CustomerViewHeaderPersonalComponent;
  let fixture: ComponentFixture<CustomerViewHeaderPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerViewHeaderPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewHeaderPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
