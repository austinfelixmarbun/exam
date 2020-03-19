import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInfoViewComponent } from './main-info-view.component';

describe('MainInfoViewComponent', () => {
  let component: MainInfoViewComponent;
  let fixture: ComponentFixture<MainInfoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainInfoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
