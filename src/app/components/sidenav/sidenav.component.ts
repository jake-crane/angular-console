import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { NavbarService } from '../../services/navbar-service/navbar.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor(private navbarService: NavbarService) { }

  toggleSidenav() {
    this.navbarService.getSubject().next();
  }

  ngOnInit() {
    this.navbarService.getSubject().asObservable().subscribe(() => {
      this.sidenav.toggle();
    });
  }

}
