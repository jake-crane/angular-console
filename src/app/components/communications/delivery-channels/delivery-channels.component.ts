import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DeliveryChannelsService } from '../../../services/delivery-channels/delivery-channels.service';
import DeliveryChannels from '../../../models/DeliveryChannels';

@Component({
  selector: 'app-delivery-channels',
  templateUrl: './delivery-channels.component.html',
  styleUrls: ['./delivery-channels.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeliveryChannelsComponent implements OnInit {

  private deliveryChannels: Promise<DeliveryChannels>;

  constructor(private deliveryChannelsService: DeliveryChannelsService) { }

  ngOnInit() {
    this.deliveryChannels = this.deliveryChannelsService.getDeliveyChannels();
  }

}
