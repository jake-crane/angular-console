import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import DeliveryChannels from '../../models/DeliveryChannels';

@Injectable()
export class DeliveryChannelsService {

  private subject: BehaviorSubject<DeliveryChannels> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getSubject(): BehaviorSubject<DeliveryChannels> {
    return this.subject;
  }

  parse(xml: string): DeliveryChannels {
    const xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');
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

  handleResponse(xml: string) {
    this.subject.next(this.parse(xml));
  }

  initDeliveyChannels() {
    this.http.get('./communications/deliverychannels', { responseType: 'text' })
      .subscribe(this.handleResponse.bind(this));
  }

}
