import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration-service/configuration.service';
import { Configuration } from '../../models/Configuration';

@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css']
})
export class CommunicationsComponent implements OnInit {

  private deliveryConfig: Configuration;
  private smptHost = '';
  private smtpPort = '';
  private smtpUser = '';
  private smtpPassword = '';

  private encryptionKey: Configuration;
  private hmacTolerence: Configuration;

  constructor(private configurationService: ConfigurationService) { }

  parseXML() {
    const xmlDoc = new DOMParser().parseFromString(this.deliveryConfig.value, 'text/xml');

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

  cancelMailConfigEdit() {
    this.parseXML();
  }

  updateMailConfig() {
    const xmlDoc = new DOMParser().parseFromString(this.deliveryConfig.value, 'text/xml');

    const hostNode = xmlDoc.querySelector('[key="mail.smtp.host"]');
    if (hostNode)
      hostNode.textContent = this.smptHost;

    const portNode = xmlDoc.querySelector('[key="mail.smtp.port"]');
    if (portNode)
      portNode.textContent = this.smtpPort;

    const userNode = xmlDoc.querySelector('[key="mail.smtp.user"]');
    if (userNode)
      userNode.textContent = this.smtpUser;

    const passwordNode = xmlDoc.querySelector('[key="mail.smtp.password"]');
    if (passwordNode)
      passwordNode.textContent = this.smtpPassword;

    this.deliveryConfig.value = new XMLSerializer().serializeToString(xmlDoc);
    this.configurationService.updateConfiguration(this.deliveryConfig);
  }

  ngOnInit() {
    this.configurationService.getConfigurations().subscribe(
      (configs) => {
        this.deliveryConfig = configs.find((config) => {
          return config.key === 'CMM_mail_properties';
        });
        if (this.deliveryConfig) {
          this.parseXML();
        }
        this.encryptionKey = configs.find((config) => {
          return config.key === 'AWD_ENCRYPTION_KEY';
        });
        this.hmacTolerence = configs.find((config) => {
          return config.key === 'CMG_HmacAuthenticationServletTolerance';
        });

      }
    );
  }

}
