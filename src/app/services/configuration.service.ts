import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from '../models/Configuration';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigurationService {

  private configurationsUrl = './configurations';

  constructor(private http: Http) { }

  getConfigurations(): Promise<Configuration[]> {
    return this.http.get(this.configurationsUrl)
      .toPromise()
      .then(response => response.json().configuration as Configuration[])
      .catch(this.handleError);
  }

  addConfiguration(configuration: Configuration): Promise<any> {
    return this.http.post(this.configurationsUrl, configuration)
      .toPromise()
      .catch(this.handleError);
  }

  updateConfiguration(configuration: Configuration): Promise<any> {
    return this.http.put(this.configurationsUrl + '/' + configuration.id, configuration)
      .toPromise()
      .catch(this.handleError);
  }

  deleteConfiguration(configurationId: number): Promise<any> {
    return this.http.delete(this.configurationsUrl + '/' + configurationId)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
