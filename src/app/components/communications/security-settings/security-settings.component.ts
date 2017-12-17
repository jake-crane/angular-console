import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SecuritySettingsService } from '../../../services/security-settings/security-settings.service';
import SecuritySettings from '../../../models/SecuritySettings';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecuritySettingsComponent implements OnInit {

  private securitySettings: Promise<SecuritySettings>;

  constructor(private securitySettingsService: SecuritySettingsService) { }

  ngOnInit() {
    this.securitySettings = this.securitySettingsService.getSecuritySettings();
  }

}
