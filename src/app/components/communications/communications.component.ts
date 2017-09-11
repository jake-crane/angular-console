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
  private tempEncryptionKeyValue: string;
  private hmacTolerence: Configuration;
  private tempHMACTolerance: string;

  constructor(private configurationService: ConfigurationService) { }

  parseXML() {
    const xmlDoc = new DOMParser().parseFromString(this.deliveryConfig.value, 'text/xml');

    const hostNode = xmlDoc.querySelector('[key="mail.smtp.host"]');
    this.smptHost = hostNode && hostNode.textContent;

    const portNode = xmlDoc.querySelector('[key="mail.smtp.port"]');
    this.smtpPort = portNode && portNode.textContent;

    const userNode = xmlDoc.querySelector('[key="mail.smtp.user"]');
    this.smtpUser = userNode && userNode.textContent;

    const passwordNode = xmlDoc.querySelector('[key="mail.smtp.password"]');
    this.smtpPassword = passwordNode && passwordNode.textContent;
  }

  cancelMailConfigEdit() {
    this.parseXML();
  }

  updateMailConfig() {
    const xmlDoc = new DOMParser().parseFromString(this.deliveryConfig.value, 'text/xml');

    const hostNode = xmlDoc.querySelector('[key="mail.smtp.host"]');
    if (hostNode) {
      hostNode.textContent = this.smptHost;
    } else {
      const entry = xmlDoc.createElement("entry");
      entry.setAttribute('key', 'mail.smtp.host');
      xmlDoc.getElementsByTagName('properties')[0].appendChild(entry); //TODO make safe
    }

    const portNode = xmlDoc.querySelector('[key="mail.smtp.port"]');
    if (portNode) {
      portNode.textContent = this.smtpPort;
    } else {
      const entry = xmlDoc.createElement("entry");
      entry.setAttribute('key', 'mail.smtp.port');
      xmlDoc.getElementsByTagName('properties')[0].appendChild(entry); //TODO make safe
    }

    debugger;
    const userNode = xmlDoc.querySelector('[key="mail.smtp.user"]');
    if (userNode) {
      userNode.textContent = this.smtpUser;
    } else {
      const entry = xmlDoc.createElement("entry");
      entry.setAttribute('key', 'mail.smtp.user');
      xmlDoc.getElementsByTagName('properties')[0].appendChild(entry); //TODO make safe
    }

    const passwordNode = xmlDoc.querySelector('[key="mail.smtp.password"]');
    if (passwordNode) {
      passwordNode.textContent = this.smtpPassword;
    } else {
      const entry = xmlDoc.createElement("entry");
      entry.setAttribute('key', 'mail.smtp.password');
      xmlDoc.getElementsByTagName('properties')[0].appendChild(entry); //TODO make safe
    }

    this.deliveryConfig.value = new XMLSerializer().serializeToString(xmlDoc);
    this.configurationService.updateConfiguration(this.deliveryConfig);
  }

  cancelSecurityEdit() {
    this.tempEncryptionKeyValue = this.encryptionKey.value;
    this.tempHMACTolerance = this.hmacTolerence.value;
  }

  ngOnInit() {
    this.configurationService.getConfigurations().subscribe(
      (configs) => {
        this.deliveryConfig = configs.find((config) => {
          return config.key === 'CMM_mail_properties';
        });
        if (this.deliveryConfig)
          this.parseXML();

        this.encryptionKey = configs.find((config) => {
          return config.key === 'AWD_ENCRYPTION_KEY';
        });
        if (this.encryptionKey)
          this.tempEncryptionKeyValue = this.encryptionKey.value;

        this.hmacTolerence = configs.find((config) => {
          return config.key === 'CMG_HmacAuthenticationServletTolerance';
        });
        if (this.hmacTolerence)
          this.tempHMACTolerance = this.hmacTolerence.value;

      }
    );
  }

}
