import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifBroadcastMessagePagingComponent } from './notif-broadcast-message-paging.component';

describe('NotifBroadcastMessagePagingComponent', () => {
  let component: NotifBroadcastMessagePagingComponent;
  let fixture: ComponentFixture<NotifBroadcastMessagePagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifBroadcastMessagePagingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifBroadcastMessagePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
