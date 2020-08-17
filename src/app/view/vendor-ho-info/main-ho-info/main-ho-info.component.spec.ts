import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHoInfoComponent } from './main-ho-info.component';

describe('MainHoInfoComponent', () => {
  let component: MainHoInfoComponent;
  let fixture: ComponentFixture<MainHoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
