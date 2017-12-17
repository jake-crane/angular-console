import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DeliveryChannelsService } from '../../../services/delivery-channels/delivery-channels.service';
import DeliveryChannels from '../../../models/DeliveryChannels';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-delivery-channels',
  templateUrl: './delivery-channels.component.html',
  styleUrls: ['./delivery-channels.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeliveryChannelsComponent implements OnInit {

  private deliveryChannels: BehaviorSubject<DeliveryChannels>;

  constructor(private deliveryChannelsService: DeliveryChannelsService) { }

  ngOnInit() {
    this.deliveryChannels = this.deliveryChannelsService.getSubject();
    this.deliveryChannelsService.initDeliveyChannels();
  }

}
