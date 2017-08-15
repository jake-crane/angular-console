import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration-service/configuration.service';
import { FilterService } from '../../services/filter-service/filter.service';
import { Configuration } from '../../models/Configuration';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {
  private columnHeaders: string[] = ['Key', 'Name', 'Value', 'Description', 'Type', 'Action'];
  private configurations: Configuration[];
  private newConfiguration: Configuration = new Configuration(true);
  private configDataSource: DataSource<any>;

  constructor(private configurationService: ConfigurationService,
    private filterService: FilterService) { }

  ngOnInit(): void {
    /* this.configurationService.getConfigurations().then(
      configurations => this.configurations = configurations
    ); */
    this.filterService.currentMessage.subscribe(this.onFilter.bind(this));
  }

  onAdd(configuration: Configuration): void {
    this.configurationService.addConfiguration(configuration).then(
      (newConfig: Configuration) => {
        this.configurations.push(newConfig);
        this.configurations = this.configurations.sort(Configuration.compare);
        this.newConfiguration = new Configuration(true);
      }
    );
  }

  onUpdate(configuration: Configuration): void {
    this.configurationService.updateConfiguration(configuration).then(
      () => {
        this.configurations = this.configurations.sort(Configuration.compare);
        configuration.editMode = false;
      }
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

class ExampleDataSource extends DataSource<any> {

  constructor(private configurationService: ConfigurationService) {
    super();
  }

  connect(): Observable<Configuration[]> {
    return this.configurationService.getConfigurations();
  }

  disconnect() {}
}