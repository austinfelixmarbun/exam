import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDocumentInformationComponent } from './asset-document-information.component';

describe('AssetDocumentInformationComponent', () => {
  let component: AssetDocumentInformationComponent;
  let fixture: ComponentFixture<AssetDocumentInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDocumentInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDocumentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
