import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLicenseComponent } from './detail-license.component';

describe('DetailLicenseComponent', () => {
  let component: DetailLicenseComponent;
  let fixture: ComponentFixture<DetailLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
