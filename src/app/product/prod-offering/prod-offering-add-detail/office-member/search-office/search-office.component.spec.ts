import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOfficeComponentOffering } from './search-office.component';

describe('SearchOfficeComponent', () => {
  let component: SearchOfficeComponentOffering;
  let fixture: ComponentFixture<SearchOfficeComponentOffering>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOfficeComponentOffering ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOfficeComponentOffering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
