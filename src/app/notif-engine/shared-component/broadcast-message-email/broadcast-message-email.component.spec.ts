import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastMessageEmailComponent } from './broadcast-message-email.component';

describe('BroadcastMessageEmailComponent', () => {
  let component: BroadcastMessageEmailComponent;
  let fixture: ComponentFixture<BroadcastMessageEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastMessageEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastMessageEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
