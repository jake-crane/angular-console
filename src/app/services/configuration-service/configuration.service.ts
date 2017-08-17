import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { Configuration } from '../../models/Configuration';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigurationService {

  // private configurationsUrl = '../awd/config/services/v1/console/configurations/';
  private configurationsUrl = './configurations/';
  private headers: Headers = new Headers();
  private options = new RequestOptions({ headers: this.headers });
  private configSubject = new BehaviorSubject<Configuration[]>([]);

  constructor(private http: Http) { }

  sortAndCreateObjects(configurations): Configuration[] {
    return configurations
      .map(config => new Configuration(false, config))
      .sort(Configuration.compare);
  }

  getConfigurations(): Subject<Configuration[]> {
    this.http.get(this.configurationsUrl)
      .toPromise().then(
      (res) => {
        const csrf = res.headers.get('CSRF_TOKEN');
        this.headers.append('CSRF_TOKEN', csrf);
        this.configSubject.next(res.json().configuration);
      })
      .catch(this.handleError);
      return this.configSubject;
  }

  addToSubject(config: Configuration): void {
    const configurations: Configuration[] = [...this.configSubject.getValue()];
    configurations.push(config);
    this.configSubject.next(configurations);
  }

  updateSubject(config: Configuration): void {
    const configurations: Configuration[] = [...this.configSubject.getValue()];
    const index: number = configurations.findIndex(configuration => configuration.id === config.id);
      if (index > -1) {
        configurations[index] = config;
        this.configSubject.next(configurations);
      }
  }

  deleteFromSubject(id: number): void {
    const configurations: Configuration[] = [...this.configSubject.getValue()];
    const removeIndex: number = configurations.findIndex(
        configuration => configuration.id === id);
      if (removeIndex > -1) {
        configurations.splice(removeIndex, 1);
      }
    this.configSubject.next(configurations);
  }

  addConfiguration(configuration: Configuration): void {
    this.http.post(this.configurationsUrl, configuration, this.options)
      .toPromise()
      .then((config) => {
        this.addToSubject(new Configuration(false, config.json()));
      })
      .catch(this.handleError);
  }

  updateConfiguration(configuration: Configuration): Promise<any> {
    return this.http.put(this.configurationsUrl + configuration.id, configuration, this.options)
      .toPromise()
      .then(config => this.updateSubject(configuration))
      .catch(this.handleError);
  }

  deleteConfiguration(configurationId: number): Promise<any> {
    return this.http.delete(this.configurationsUrl + configurationId, this.options)
      .toPromise()
      .then(config => this.deleteFromSubject(configurationId))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
