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
  private smptHost = '';
  private smtpPort = '';
  private smtpUser = '';
  private smtpPassword = '';

  constructor(private configurationService: ConfigurationService) { }

  parseXML(deliveryConfig: Configuration) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(deliveryConfig.value, 'text/xml');

    const hostNode = xmlDoc.querySelector('[key="mail.smtp.host"]');
    if (hostNode)
      this.smptHost = hostNode.textContent;

    const portNode = xmlDoc.querySelector('[key="mail.smtp.port"]');
    if (portNode)
      this.smtpPort = portNode.textContent;

    const userNode = xmlDoc.querySelector('[key="mail.smtp.user"]');
    if (userNode)
      this.smtpUser = userNode.textContent;

    const passwordNode = xmlDoc.querySelector('[key="mail.smtp.password"]');
    if (passwordNode)
      this.smtpPassword = passwordNode.textContent;
  }

  ngOnInit() {
    this.configurationService.getConfigurations().subscribe(
      (configs) => {
        const deliveryConfig = configs.find((config) => {
          return config.key === 'CMM_mail_properties';
        });
        if (deliveryConfig) {
          this.parseXML(deliveryConfig);
        }
      }
    );
  }

}
