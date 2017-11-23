import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { Configuration } from '../../models/Configuration';
import { ConfigurationModalComponent } from '../configuration-modal/configuration-modal.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationsComponent implements OnInit {

  private observable: Observable<Configuration[]>;

  constructor(private configurationService: ConfigurationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.observable = this.configurationService.getConfigurations().asObservable();
  }

  addConfiguration() {
    const dialogRef = this.dialog.open(ConfigurationModalComponent, {
      width: '60%',
      disableClose: true
    });
  }

}
