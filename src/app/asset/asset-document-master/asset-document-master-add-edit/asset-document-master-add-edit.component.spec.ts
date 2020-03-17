import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetDocumentMasterAddEditComponent } from './asset-document-master-add-edit.component';

describe('AssetDocumentMasterAddEditComponent', () => {
  let component: AssetDocumentMasterAddEditComponent;
  let fixture: ComponentFixture<AssetDocumentMasterAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDocumentMasterAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDocumentMasterAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
