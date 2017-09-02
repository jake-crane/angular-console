import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavbarService {

  private subject = new Subject();

  constructor() { }

  toggle() {
    this.subject.next();
  }

  getSubject() {
    return this.subject;
  }

}
