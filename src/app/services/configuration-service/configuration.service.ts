import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from '../../models/Configuration';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigurationService {

  private configurationsUrl = './configurations';
  private headers: Headers = new Headers();
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  sortAndCreateObjects(jsonConfigurations): Configuration[] {
    return jsonConfigurations
      .map(json => new Configuration(false, json))
      .sort(Configuration.compare);
  }

  getConfigurations(): Promise<Configuration[]> {
    return this.http.get(this.configurationsUrl)
      .toPromise()
      .then(response => {
        const csrf = response.headers.get('CSRF_TOKEN');
        this.headers.append('CSRF_TOKEN', csrf);
        return this.sortAndCreateObjects(response.json().configuration);
      })
      .catch(this.handleError);
  }

  addConfiguration(configuration: Configuration): Promise<any> {
    return this.http.post(this.configurationsUrl, configuration, this.options)
      .toPromise()
      .catch(this.handleError);
  }

  updateConfiguration(configuration: Configuration): Promise<any> {
    return this.http.put(this.configurationsUrl + '/' + configuration.id, configuration, this.options)
      .toPromise()
      .catch(this.handleError);
  }

  deleteConfiguration(configurationId: number): Promise<any> {
    return this.http.delete(this.configurationsUrl + '/' + configurationId, this.options)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
