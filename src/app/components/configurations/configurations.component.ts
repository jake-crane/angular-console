import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { Configuration } from '../../models/Configuration';
import { ConfigurationModalComponent } from '../configuration-modal/configuration-modal.component';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationsComponent implements OnInit {

  private subject: BehaviorSubject<Configuration[]>;

  constructor(private configurationService: ConfigurationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.subject = this.configurationService.getSubject();
  }

  addConfiguration() {
    const dialogRef = this.dialog.open(ConfigurationModalComponent, {
      width: '60%',
      disableClose: true
    });
  }

}
