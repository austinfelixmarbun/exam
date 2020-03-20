import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoBankInfoComponent } from './ho-bank-info.component';

describe('HoBankInfoComponent', () => {
  let component: HoBankInfoComponent;
  let fixture: ComponentFixture<HoBankInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoBankInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoBankInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
