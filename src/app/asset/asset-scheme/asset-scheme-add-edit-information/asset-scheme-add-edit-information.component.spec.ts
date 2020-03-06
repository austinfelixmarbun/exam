import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSchemeAddEditInformationComponent } from './asset-scheme-add-edit-information.component';

describe('AssetSchemeAddEditInformationComponent', () => {
  let component: AssetSchemeAddEditInformationComponent;
  let fixture: ComponentFixture<AssetSchemeAddEditInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSchemeAddEditInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSchemeAddEditInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
