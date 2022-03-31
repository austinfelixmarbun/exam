import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifTemplatePagingComponent } from './notif-template-paging.component';

describe('NotifTemplatePagingComponent', () => {
  let component: NotifTemplatePagingComponent;
  let fixture: ComponentFixture<NotifTemplatePagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifTemplatePagingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifTemplatePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
