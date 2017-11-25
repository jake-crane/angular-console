import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseString } from 'xml2js';
import { Observable } from 'rxjs/Observable';
import DeliveryChannels from '../../models/DeliveryChannels';

@Injectable()
export class DeliveryChannelsService {

  constructor(private http: HttpClient) { }

  parse(xmlStr): DeliveryChannels {
    const xmlDoc = new DOMParser().parseFromString(xmlStr, 'text/xml');
    const hostNode = xmlDoc.querySelector('smtpHostName');
    const portNode = xmlDoc.querySelector('smtpHostPort');
    const userNode = xmlDoc.querySelector('user');
    const passwordNode = xmlDoc.querySelector('password');
    return {
      smtpHost: hostNode && hostNode.textContent,
      smtpPort: portNode && portNode.textContent,
      smtpUser: userNode && userNode.textContent,
      smtpPassword: passwordNode && passwordNode.textContent
    };
  }

  getDeliveyChannels() {
    return this.http.get('./communications/deliverychannels', { responseType: 'text' })
      .toPromise().then(this.parse);
  }

}
