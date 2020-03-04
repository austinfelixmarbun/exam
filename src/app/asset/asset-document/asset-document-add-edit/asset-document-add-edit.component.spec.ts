import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDocumentAddEditComponent } from './asset-document-add-edit.component';

describe('AssetDocumentAddEditComponent', () => {
  let component: AssetDocumentAddEditComponent;
  let fixture: ComponentFixture<AssetDocumentAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDocumentAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDocumentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
