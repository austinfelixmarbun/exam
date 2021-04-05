import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalGroupFactComponent } from './journal-group-fact.component';

describe('JournalGroupFactComponent', () => {
  let component: JournalGroupFactComponent;
  let fixture: ComponentFixture<JournalGroupFactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalGroupFactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalGroupFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
