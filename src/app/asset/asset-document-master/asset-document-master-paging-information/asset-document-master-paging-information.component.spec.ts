import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDocumentMasterPagingInformationComponent } from './asset-document-master-paging-information.component';

describe('AssetDocumentMasterPagingInformationComponent', () => {
  let component: AssetDocumentMasterPagingInformationComponent;
  let fixture: ComponentFixture<AssetDocumentMasterPagingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDocumentMasterPagingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDocumentMasterPagingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
