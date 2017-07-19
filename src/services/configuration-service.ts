import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configurations } from '../models/Configurations';

@Injectable()
export class ConfigurationsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private configurationsUrl = './configurations.json';  // URL to web api

  constructor(private http: Http) { }

  getConfigurations(): Promise<Configurations> {
    return this.http.get(this.configurationsUrl)
               .toPromise()
               .then(response => response.json().data as Configurations)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
