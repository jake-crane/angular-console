import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import SecuritySettings from '../../models/SecuritySettings';

@Injectable()
export class SecuritySettingsService {

  private subject: BehaviorSubject<SecuritySettings> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getSubject(): BehaviorSubject<SecuritySettings> {
    return this.subject;
  }

  parse(xml: string): SecuritySettings {
    const xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');
    const authKeyNode = xmlDoc.querySelector('authKey');
    const authFilterToleranceNode = xmlDoc.querySelector('authFilterTolerance');
    const authRedirectToleranceNode = xmlDoc.querySelector('authRequestTolerance');
    const authRequestToleranceNode = xmlDoc.querySelector('authRedirectTolerance');
    const authServletToleranceNode = xmlDoc.querySelector('authRequestTolerance');
    return {
      authKey: authKeyNode && authKeyNode.textContent,
      authFilterTolerance: authFilterToleranceNode && authFilterToleranceNode.textContent,
      authRedirectTolerance: authRedirectToleranceNode && authRedirectToleranceNode.textContent,
      authRequestTolerance: authRequestToleranceNode && authRequestToleranceNode.textContent,
      authServletTolerance: authServletToleranceNode && authServletToleranceNode.textContent
    };
  }

  handleResponse(xml: string) {
    this.subject.next(this.parse(xml));
  }

  initSecuritySettings(): void {
    this.http.get('./communications/systemsecurity', { responseType: 'text' })
      .subscribe(this.handleResponse.bind(this));
  }

}
