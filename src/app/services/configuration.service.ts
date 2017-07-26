import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from '../models/Configuration';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigurationService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private configurationsUrl = './configurations.json';  // URL to web api

  subject: BehaviorSubject<Configuration[]> = new BehaviorSubject<Configuration[]>(null);

  constructor(private http: Http) { }

  getConfigurations(): void {
    this.http.get(this.configurationsUrl)
      .toPromise()
      .then(response => this.subject.next(response.json().configuration as Configuration[]))
      .catch(this.handleError);
  }

  addConfiguration(configuration: Configuration): Promise<any> {
    const configurations: Configuration[] = [...this.subject.getValue()];
    configurations.push(configuration);
    this.subject.next(configurations);
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

  stringContainsIgnoreCase(s1: string, s2: string) {
    return s1 && (s2 || s2 === '') && s1.toUpperCase().indexOf(s2.toUpperCase()) > -1;
  }

  filterConfigurations(s: string) {
    const filteredItems: Configuration[] = this.subject.getValue().map(
      (configuration) => {
        configuration.hidden = !(
          this.stringContainsIgnoreCase(configuration.name, s)
          || this.stringContainsIgnoreCase(configuration.key, s)
          || this.stringContainsIgnoreCase(configuration.value, s)
          || this.stringContainsIgnoreCase(configuration.description, s)
          || this.stringContainsIgnoreCase(configuration.type, s));
        return configuration;
      }
    );
    this.subject.next(filteredItems);
  }

}
