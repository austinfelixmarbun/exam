import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetSchemeComponent } from './add-asset-scheme.component';

describe('AddAssetSchemeComponent', () => {
  let component: AddAssetSchemeComponent;
  let fixture: ComponentFixture<AddAssetSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssetSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
