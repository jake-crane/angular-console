import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChannelsComponent } from './delivery-channels.component';

describe('DeliveryChannelsComponent', () => {
  let component: DeliveryChannelsComponent;
  let fixture: ComponentFixture<DeliveryChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
