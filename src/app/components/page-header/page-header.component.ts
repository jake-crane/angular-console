import { Component, HostListener, ViewChild } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class HeaderComponent {

  private searchValue: string;

  @ViewChild('search') search;

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
      e.preventDefault();
      this.search.nativeElement.focus();
    }
  }

  constructor(private configurationService: ConfigurationService) { }

  onSearchKeypress(e) {
    this.configurationService.filterConfigurations(this.searchValue);
  }
}
