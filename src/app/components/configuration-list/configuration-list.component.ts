import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { Configuration } from '../../models/Configuration';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {
  configurations: Configuration[];
  newConfiguration: Configuration = new Configuration(true);

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.configurationService.getConfigurations();
    this.configurationService.subject.subscribe(
      configurations => this.configurations = configurations
    );
  }

  onAdd(configuration: Configuration): void {
    configuration.id = Math.floor(Math.random() * 1000000) + 1;
    this.configurationService.addConfiguration(configuration).then();
    this.newConfiguration = new Configuration(true);
  }

  onUpdate(configuration: Configuration): void {
    this.configurationService.updateConfiguration(configuration);
  }

  onDelete(id: number): void {
    this.configurationService.deleteConfiguration(id)
      .then(() => {
        const deleteIndex: number = this.configurations.findIndex(configuration =>
          configuration.id === id);
        this.configurations.splice(deleteIndex, 1);
      });
  }
}
