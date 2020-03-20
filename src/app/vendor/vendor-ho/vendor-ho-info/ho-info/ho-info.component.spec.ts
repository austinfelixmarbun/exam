import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoInfoComponent } from './ho-info.component';

describe('HoInfoComponent', () => {
  let component: HoInfoComponent;
  let fixture: ComponentFixture<HoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
