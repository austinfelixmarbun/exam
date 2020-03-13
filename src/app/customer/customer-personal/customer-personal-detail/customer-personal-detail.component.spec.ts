import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalDetailComponent } from './customer-personal-detail.component';

describe('CustomerPersonalDetailComponent', () => {
  let component: CustomerPersonalDetailComponent;
  let fixture: ComponentFixture<CustomerPersonalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPersonalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
