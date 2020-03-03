import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDocumentPagingComponent } from './asset-document-paging.component';

describe('AssetDocumentPagingComponent', () => {
  let component: AssetDocumentPagingComponent;
  let fixture: ComponentFixture<AssetDocumentPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDocumentPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDocumentPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
