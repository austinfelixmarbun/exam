import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMessageTosendComponent } from './body-message-tosend.component';

describe('BodyMessageTosendComponent', () => {
  let component: BodyMessageTosendComponent;
  let fixture: ComponentFixture<BodyMessageTosendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyMessageTosendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyMessageTosendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
