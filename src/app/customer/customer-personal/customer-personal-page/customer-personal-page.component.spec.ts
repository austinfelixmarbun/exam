import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalPageComponent } from './customer-personal-page.component';

describe('CustomerPersonalPageComponent', () => {
  let component: CustomerPersonalPageComponent;
  let fixture: ComponentFixture<CustomerPersonalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPersonalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
