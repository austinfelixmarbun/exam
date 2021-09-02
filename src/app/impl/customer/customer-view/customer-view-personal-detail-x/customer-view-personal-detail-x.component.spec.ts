import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewPersonalDetailXComponent } from './customer-view-personal-detail-x.component';

describe('CustomerViewPersonalDetailXComponent', () => {
  let component: CustomerViewPersonalDetailXComponent;
  let fixture: ComponentFixture<CustomerViewPersonalDetailXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerViewPersonalDetailXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewPersonalDetailXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
