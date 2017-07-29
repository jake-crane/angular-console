import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration-service/configuration.service';
import { FilterService } from '../../services/filter-service/filter.service';
import { Configuration } from '../../models/Configuration';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {
  private configurations: Configuration[];
  private newConfiguration: Configuration = new Configuration(true);

  constructor(private configurationService: ConfigurationService,
    private filterService: FilterService) { }

  ngOnInit(): void {
    this.configurationService.getConfigurations().then(
      configurations => this.configurations = configurations
    );
    this.filterService.currentMessage.subscribe(this.onFilter.bind(this));
  }

  onAdd(configuration: Configuration): void {
    configuration.id = Math.floor(Math.random() * 1000000) + 1;
    this.configurationService.addConfiguration(configuration).then(
      () => {
        configuration.editMode = false;
        this.configurations.push(configuration);
        this.newConfiguration = new Configuration(true);
      }
    );
  }

  onUpdate(configuration: Configuration): void {
    this.configurationService.updateConfiguration(configuration).then(
      () => configuration.editMode = false
    );
  }

  onDelete(id: number): void {
    this.configurationService.deleteConfiguration(id).then(() => {
      const removeIndex: number = this.configurations.findIndex(
        configuration => configuration.id === id);
      if (removeIndex > -1) {
        this.configurations.splice(removeIndex, 1);
      }
    });
  }

  stringContainsIgnoreCase(s1: string, s2: string) {
    return s1 && (s2 || s2 === '') && s1.toUpperCase().includes(s2.toUpperCase());
  }

  onFilter(s: string) {
    if (this.configurations) {
      for (const configuration of this.configurations) {
        configuration.hidden = !(
          this.stringContainsIgnoreCase(configuration.name, s)
          || this.stringContainsIgnoreCase(configuration.key, s)
          || this.stringContainsIgnoreCase(configuration.value, s)
          || this.stringContainsIgnoreCase(configuration.description, s)
          || this.stringContainsIgnoreCase(configuration.type, s));
      }
      this.newConfiguration.hidden = s && s !== '';
    }
  }
}
