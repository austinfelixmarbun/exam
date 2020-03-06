import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalMainInfoComponent } from './customer-personal-main-info.component';

describe('CustomerPersonalMainInfoComponent', () => {
  let component: CustomerPersonalMainInfoComponent;
  let fixture: ComponentFixture<CustomerPersonalMainInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPersonalMainInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalMainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
