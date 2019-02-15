import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectVerifDetailComponent } from './prospect-verif-detail.component';

describe('ProspectVerifDetailComponent', () => {
  let component: ProspectVerifDetailComponent;
  let fixture: ComponentFixture<ProspectVerifDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectVerifDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectVerifDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
