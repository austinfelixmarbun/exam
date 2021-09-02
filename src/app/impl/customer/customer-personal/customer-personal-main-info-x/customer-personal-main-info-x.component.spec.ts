import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalMainInfoXComponent } from './customer-personal-main-info-x.component';

describe('CustomerPersonalMainInfoXComponent', () => {
  let component: CustomerPersonalMainInfoXComponent;
  let fixture: ComponentFixture<CustomerPersonalMainInfoXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPersonalMainInfoXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalMainInfoXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
