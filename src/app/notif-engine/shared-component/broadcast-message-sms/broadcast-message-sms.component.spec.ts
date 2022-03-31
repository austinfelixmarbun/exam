import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastMessageSmsComponent } from './broadcast-message-sms.component';

describe('BroadcastMessageSmsComponent', () => {
  let component: BroadcastMessageSmsComponent;
  let fixture: ComponentFixture<BroadcastMessageSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastMessageSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastMessageSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
