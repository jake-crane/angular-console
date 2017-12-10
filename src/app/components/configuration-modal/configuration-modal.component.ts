import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfigurationService } from '../../services/configuration/configuration.service';

@Component({
  selector: 'app-configuration-modal',
  templateUrl: './configuration-modal.component.html',
  styleUrls: ['./configuration-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationModalComponent {

  private config;

  constructor(public dialogRef: MatDialogRef<ConfigurationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private configurationService: ConfigurationService) {
      this.config = {...data};
    }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.config.id) {
      this.configurationService.updateConfiguration(this.config);
    } else {
      this.configurationService.addConfiguration(this.config);
    }
    this.dialogRef.close();
  }

}
