import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../services/configuration-service/configuration.service';
import { FilterService } from '../../services/filter-service/filter.service';
import { Configuration } from '../../models/Configuration';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {
  private columnHeaders: string[] = ['Key', 'Name', 'Value', 'Description', 'Type', 'Action'];
  private newConfiguration: Configuration = new Configuration(true);
  private configDataSource: DataSource<any>;
  private test;
  constructor(private configurationService: ConfigurationService,
    private filterService: FilterService) {
      this.configDataSource = new ExampleDataSource(configurationService);
    }

  ngOnInit(): void {
    this.filterService.currentMessage.subscribe(this.onFilter.bind(this));
    this.test = this.configurationService.getConfigurations();
  }

  onEdit(configuration: Configuration) {
    configuration.editMode = true;
  }

  onCancelEdit(configuration: Configuration) {
    configuration.editMode = false;
  }

  onAdd(configuration: Configuration): void {
    this.configurationService.addConfiguration(configuration);
  }

  onUpdate(configuration: Configuration): void {
    this.configurationService.updateConfiguration(configuration);
  }

  onDelete(id: number): void {
    this.configurationService.deleteConfiguration(id);
  }

  stringContainsIgnoreCase(s1: string, s2: string) {
    return s1 && (s2 || s2 === '') && s1.toUpperCase().includes(s2.toUpperCase());
  }

  onFilter(s: string) {
    /*if (this.configurations) {
      for (const configuration of this.configurations) {
        configuration.hidden = !(
          this.stringContainsIgnoreCase(configuration.name, s)
          || this.stringContainsIgnoreCase(configuration.key, s)
          || this.stringContainsIgnoreCase(configuration.value, s)
          || this.stringContainsIgnoreCase(configuration.description, s)
          || this.stringContainsIgnoreCase(configuration.type, s));
      }
      this.newConfiguration.hidden = s && s !== '';
    }*/
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
