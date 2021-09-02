import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalDetailXComponent } from './customer-personal-detail-x.component';

describe('CustomerPersonalDetailXComponent', () => {
  let component: CustomerPersonalDetailXComponent;
  let fixture: ComponentFixture<CustomerPersonalDetailXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPersonalDetailXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalDetailXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
