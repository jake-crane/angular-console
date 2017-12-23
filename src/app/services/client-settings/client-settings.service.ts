import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Client from '../../models/Client';

@Injectable()
export class ClientSettingsService {

  constructor(private http: HttpClient) { }

  private subject: BehaviorSubject<Client[]> = new BehaviorSubject(null);

  getSubject(): BehaviorSubject<Client[]> {
    return this.subject;
  }

  parse(xml: string): Client[] {
    const xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');
    const clientDetailNodes = xmlDoc.querySelectorAll('clientDetail');
    const clientDetails = [];
    clientDetailNodes.forEach(function (clientNode) {
      const idNode = clientNode.querySelector('id');
      const nameNode = clientNode.querySelector('name');
      const thirdPartyNode = clientNode.querySelector('thirdParty');
      const billingIdNode = clientNode.querySelector('billingId');
      clientDetails.push({
        id: idNode && idNode.textContent,
        name: nameNode && nameNode.textContent,
        thirdParty: thirdPartyNode && thirdPartyNode.textContent,
        billingId: billingIdNode && billingIdNode.textContent,
      });
    }, this);
    return clientDetails;
  }

  handleResponse(xml: string) {
    this.subject.next(this.parse(xml));
  }

  initClientSettings(): void {
    this.http.get('./communications/clients', { responseType: 'text' })
      .subscribe(this.handleResponse.bind(this));
  }

}
