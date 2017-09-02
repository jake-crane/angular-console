import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConfigurationService } from '../../services/configuration-service/configuration.service';
import { Configuration } from '../../models/Configuration';
import { DataSource } from '@angular/cdk/collections';
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
  private types = [
    { value: 'TEXT', viewValue: 'Text' },
    { value: 'XML', viewValue: 'XML' },
    { value: 'ENC_PASSWORD', viewValue: 'Password' }
  ];
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
    if (configuration.id != null) {
      Object.assign(configuration, this.backupConfigurations[configuration.id]);
      delete this.backupConfigurations[configuration.id];
    } else {
      this.configDataSource.removeUncomitted();
    }
  }

  onAdd(): void {
    this.configDataSource.addUncomitted();
  }

  onSave(configuration: Configuration): void {
    if (configuration.id == null)
      this.configurationService.addConfiguration(configuration).then(() => {
        this.configDataSource.removeUncomitted();
      });
    else
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
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private uncomittedSubject: BehaviorSubject<Configuration[]> = new BehaviorSubject([]);

  get filter(): string {
    return this.filterSubject.value;
  }
  set filter(filter: string) {
    this.filterSubject.next(filter);
  }

  addUncomitted() {
    if (this.uncomittedSubject.value.length === 0)
      this.uncomittedSubject.next([new Configuration(true)]);
  }

  removeUncomitted() {
    this.uncomittedSubject.next([]);
  }

  constructor(private configService: ConfigurationService) {
    super();
  }

  connect(): Observable<Configuration[]> {
    const configSubject: BehaviorSubject<Configuration[]> = this.configService.getConfigurations();
    return configSubject.merge(this.uncomittedSubject).merge(this.filterSubject).map(() => {
      return configSubject.value.concat(this.uncomittedSubject.value).slice().filter((item: Configuration) => {
        return !item.shouldFilter(this.filter);
      });
    });
  }

  disconnect() { }
}
