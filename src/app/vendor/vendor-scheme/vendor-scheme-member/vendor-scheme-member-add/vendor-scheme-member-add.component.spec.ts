import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSchemeMemberAddComponent } from './vendor-scheme-member-add.component';

describe('VendorSchemeMemberAddComponent', () => {
  let component: VendorSchemeMemberAddComponent;
  let fixture: ComponentFixture<VendorSchemeMemberAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSchemeMemberAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSchemeMemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
