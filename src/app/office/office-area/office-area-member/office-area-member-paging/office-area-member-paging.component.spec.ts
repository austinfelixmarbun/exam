import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OfficeAreaMemberPagingComponent } from './office-area-member-paging.component';

describe('OfficeAreaMemberPagingComponent', () => {
  let component: OfficeAreaMemberPagingComponent;
  let fixture: ComponentFixture<OfficeAreaMemberPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeAreaMemberPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAreaMemberPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
