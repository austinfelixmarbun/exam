import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoGroupInfoComponent } from './ho-group-info.component';

describe('HoGroupInfoComponent', () => {
  let component: HoGroupInfoComponent;
  let fixture: ComponentFixture<HoGroupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoGroupInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoGroupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
