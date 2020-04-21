import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoContactPersonInfoComponent } from './ho-contact-person-info.component';

describe('HoContactPersonInfoComponent', () => {
  let component: HoContactPersonInfoComponent;
  let fixture: ComponentFixture<HoContactPersonInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoContactPersonInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoContactPersonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
