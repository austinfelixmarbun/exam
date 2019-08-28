import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyHolidaySchemeComponent } from './copy-holiday-scheme.component';

describe('CopyHolidaySchemeComponent', () => {
  let component: CopyHolidaySchemeComponent;
  let fixture: ComponentFixture<CopyHolidaySchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyHolidaySchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyHolidaySchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
