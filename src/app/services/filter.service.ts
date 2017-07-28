import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FilterService {

  private messageSource = new BehaviorSubject<string>(null);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(filter: string) {
    this.messageSource.next(filter);
  }

}
