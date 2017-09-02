import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar-service/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private navbarService: NavbarService) { }

  ngOnInit() {

  }
  toggleSidenav() {
    this.navbarService.getSubject().next();
  }
}
