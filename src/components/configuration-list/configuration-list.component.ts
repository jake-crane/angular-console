import { Component, OnInit } from '@angular/core';
import { ConfigurationsService } from '../../services/configuration-service';
import { Configurations } from '../../models/Configurations';

@Component({
  selector: 'configuration-list',
  templateUrl: './configuration-list.component.html',
  //   styleUrls: ['./app.component.css']
})
export class ConfigurationListComponent implements OnInit {
  configurations: Configurations
  names = ['bob', 'joe', 'suzy', 'Dave'];
  constructor(private configurationsService: ConfigurationsService) {

  }

  getConfigurations(): void {
    this.configurationsService
      .getConfigurations()
      .then(configurations => {
        this.configurations = configurations;
        console.log(configurations);
      });
  }

  ngOnInit(): void {
    this.getConfigurations();
  }
}
