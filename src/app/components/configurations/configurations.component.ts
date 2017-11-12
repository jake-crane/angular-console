import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfigurationService } from '../../services/configuration/configuration.service';
import { Configuration } from '../../models/Configuration';
import { MatDialog } from '@angular/material';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationsComponent implements OnInit {

  private configurations: Configuration[];

  constructor(private configurationService: ConfigurationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.configurationService.getConfigurations().subscribe((configurations) => {
      this.configurations = configurations;
    });
  }

  addConfiguration() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {}
    });
  }

}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MdDialogRef<DialogOverviewExampleDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
