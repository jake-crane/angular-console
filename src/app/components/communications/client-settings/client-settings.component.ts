import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientSettingsService } from '../../../services/client-settings/client-settings.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Client from '../../../models/Client';

@Component({
  selector: 'app-client-settings',
  templateUrl: './client-settings.component.html',
  styleUrls: ['./client-settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientSettingsComponent implements OnInit {

  private subject: BehaviorSubject<Client[]>;

  constructor(private clientSettingsService: ClientSettingsService) { }

  ngOnInit() {
    this.clientSettingsService.initClientSettings();
    this.subject = this.clientSettingsService.getSubject();
  }

}
