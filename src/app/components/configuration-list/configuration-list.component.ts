import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConfigurationService } from '../../services/configuration-service/configuration.service';
import { Configuration } from '../../models/Configuration';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
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

  constructor(private configurationService: ConfigurationService) {
    this.configDataSource = new ExampleDataSource(configurationService);
  }

  ngOnInit(): void {
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

}

class ExampleDataSource extends DataSource<any> {
  private filterSubject = new BehaviorSubject('');

  get filter(): string {
    return this.filterSubject.value;
  }
  set filter(filter: string) {
    this.filterSubject.next(filter);
  }

  constructor(private configurationService: ConfigurationService) {
    super();
  }

  connect(): Observable<Configuration[]> {
    const configSubject = this.configurationService.getConfigurations();
    return configSubject.merge(this.filterSubject).map(() => {
      return configSubject.value.slice().filter((item) => {
        return !item.shouldFilter(this.filter);
      });
    });
  }

  disconnect() { }
}
