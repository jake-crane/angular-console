import { Component, OnInit } from '@angular/core';
import { ConfigurationsService } from '../../services/configuration-service';
import { Configuration } from '../../models/Configuration';

@Component({
  selector: 'configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {
  configurations: Configuration[]
  constructor(private configurationsService: ConfigurationsService) {

  }

  getConfigurations(): void {
    this.configurationsService
      .getConfigurations()
      .then(configurations => this.configurations = configurations);
  }

  ngOnInit(): void {
    this.getConfigurations();
  }

  onDelete(id: number): void {
    const deleteIndex: number = this.configurations.findIndex(configuration => 
      configuration.id === id);
      this.configurations.splice(deleteIndex, 1);
  }
}
