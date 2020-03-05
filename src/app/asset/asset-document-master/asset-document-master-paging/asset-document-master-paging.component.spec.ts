import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDocumentMasterPagingComponent } from './asset-document-master-paging.component';

describe('AssetDocumentMasterPagingComponent', () => {
  let component: AssetDocumentMasterPagingComponent;
  let fixture: ComponentFixture<AssetDocumentMasterPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDocumentMasterPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDocumentMasterPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
