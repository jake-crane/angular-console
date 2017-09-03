import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration-service/configuration.service';
import { Configuration } from '../../models/Configuration';

@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css']
})
export class CommunicationsComponent implements OnInit {

  private configuration: Configuration;
  private deliveryConfig: Configuration;

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.configurationService.getConfigurations().subscribe(
      (configs) => {
        this.deliveryConfig = configs.find((config) => {
          return config.key === 'CMM_mail_properties';
        });
      }
    );
  }

}
