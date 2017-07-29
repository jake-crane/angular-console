import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter-service/filter.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class HeaderComponent {

  private searchValue: string;

  @ViewChild('search') private search;

  constructor(private filterService: FilterService) {}

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
      e.preventDefault();
      this.search.nativeElement.focus();
    }
  }

  onSearchKeypress() {
    this.filterService.changeMessage(this.searchValue);
  }

}
