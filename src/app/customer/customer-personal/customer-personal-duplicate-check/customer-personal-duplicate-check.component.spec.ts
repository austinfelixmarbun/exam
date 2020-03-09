import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPersonalDuplicateCheckComponent } from './customer-personal-duplicate-check.component';

describe('CustomerPersonalDuplicateCheckComponent', () => {
  let component: CustomerPersonalDuplicateCheckComponent;
  let fixture: ComponentFixture<CustomerPersonalDuplicateCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPersonalDuplicateCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPersonalDuplicateCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
