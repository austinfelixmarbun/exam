import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOfficeComponent } from './search-office.component';

describe('SearchOfficeComponent', () => {
  let component: SearchOfficeComponent;
  let fixture: ComponentFixture<SearchOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
