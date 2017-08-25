import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConfigurationService } from '../../services/configuration-service/configuration.service';
import { FilterService } from '../../services/filter-service/filter.service';
import { Configuration } from '../../models/Configuration';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent implements OnInit {
  private columnHeaders: string[] = ['Key', 'Name', 'Value', 'Description', 'Type', 'Action'];
  private newConfiguration: Configuration = new Configuration(true);
  private configDataSource: ExampleDataSource;
  private backupConfigurations = {};
  @ViewChild('filter') filter: ElementRef;

  constructor(private configurationService: ConfigurationService,
    private filterService: FilterService) {
      this.configDataSource = new ExampleDataSource(configurationService);
  }

  ngOnInit(): void {
    this.filterService.currentMessage.subscribe(this.onFilter.bind(this));
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
    .debounceTime(150)
    .distinctUntilChanged()
    .subscribe(() => {
      if (!this.configDataSource) { return; }
      this.configDataSource.filter = this.filter.nativeElement.value;
    });
  }

  onEdit(configuration: Configuration) {
    this.backupConfigurations[configuration.id] = new Configuration(false, configuration);
    configuration.editMode = true;
  }

  onCancelEdit(configuration: Configuration) {
      Object.assign(configuration, this.backupConfigurations[configuration.id]);
      delete this.backupConfigurations[configuration.id];
  }

  onAdd(configuration: Configuration): void {
    this.configurationService.addConfiguration(configuration);
  }

  onUpdate(configuration: Configuration): void {
    this.configurationService.updateConfiguration(configuration)
    .then(() => {
      configuration.editMode = false;
      delete this.backupConfigurations[configuration.id];
    });
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
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private configurationService: ConfigurationService) {
    super();
  }

  connect(): Observable<Configuration[]> {
    const subject = this.configurationService.getConfigurations();
    return Observable.merge(subject).map(() => {
      return subject.value.slice().filter((item) => {
        const searchStr = (item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    });
  }

  disconnect() {}
}
