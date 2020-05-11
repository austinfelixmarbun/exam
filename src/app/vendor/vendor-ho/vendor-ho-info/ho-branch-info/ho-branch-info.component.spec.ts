import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoBranchInfoComponent } from './ho-branch-info.component';

describe('HoBranchInfoComponent', () => {
  let component: HoBranchInfoComponent;
  let fixture: ComponentFixture<HoBranchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoBranchInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoBranchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
