import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcAddressGroupComponent } from './uc-address-group.component';

describe('UcAddressGroupComponent', () => {
  let component: UcAddressGroupComponent;
  let fixture: ComponentFixture<UcAddressGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcAddressGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcAddressGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
