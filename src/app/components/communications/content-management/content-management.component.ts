import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Content from '../../../models/Content';
import { ContentManagementService } from '../../../services/content-management/content-management.service';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentManagementComponent implements OnInit {

  private subject: BehaviorSubject<Content>;

  constructor(private contentManagementService: ContentManagementService) { }

  ngOnInit() {
    this.contentManagementService.initContent();
    this.subject = this.contentManagementService.getSubject();
  }

}
