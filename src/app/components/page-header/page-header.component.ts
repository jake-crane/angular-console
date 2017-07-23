import { Component, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class HeaderComponent {

  @ViewChild('search') search;

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
      e.preventDefault();
      this.search.nativeElement.focus();
    }
  }
}
