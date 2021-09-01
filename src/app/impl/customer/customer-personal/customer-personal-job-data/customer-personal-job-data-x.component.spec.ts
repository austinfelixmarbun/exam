import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalJobDataXComponent } from './customer-personal-job-data-x.component';

describe('CustomerPersonalJobDataXComponent', () => {
  let component: CustomerPersonalJobDataXComponent;
  let fixture: ComponentFixture<CustomerPersonalJobDataXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPersonalJobDataXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalJobDataXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
