import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import SecuritySettings from '../../models/SecuritySettings';

@Injectable()
export class SecuritySettingsService {

  constructor(private http: HttpClient) { }

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

  getSecuritySettings() {
    return this.http.get('./communications/systemsecurity', { responseType: 'text' })
      .toPromise().then(this.parse);
  }

}
