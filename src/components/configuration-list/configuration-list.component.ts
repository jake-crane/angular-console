import { Component, OnInit } from '@angular/core';
import { ConfigurationsService } from '../../services/configuration-service';
import { Configurations } from '../../models/Configurations';

@Component({
  selector: 'configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {
  configurations: Configurations
  constructor(private configurationsService: ConfigurationsService) {

  }

  getConfigurations(): void {
    this.configurationsService
      .getConfigurations()
      .then(configurations => this.configurations = configurations);
  }

  ngOnInit(): void {
    console.log(this.getConfigurations());
  }
}
