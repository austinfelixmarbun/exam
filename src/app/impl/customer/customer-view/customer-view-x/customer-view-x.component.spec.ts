import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewXComponent } from './customer-view-x.component';

describe('CustomerViewXComponent', () => {
  let component: CustomerViewXComponent;
  let fixture: ComponentFixture<CustomerViewXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerViewXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
