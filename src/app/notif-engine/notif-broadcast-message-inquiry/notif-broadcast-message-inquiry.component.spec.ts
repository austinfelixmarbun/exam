import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifBroadcastMessageInquiryComponent } from './notif-broadcast-message-inquiry.component';

describe('NotifBroadcastMessageInquiryComponent', () => {
  let component: NotifBroadcastMessageInquiryComponent;
  let fixture: ComponentFixture<NotifBroadcastMessageInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifBroadcastMessageInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifBroadcastMessageInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
