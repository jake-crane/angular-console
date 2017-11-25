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

  private deliveryChannels: Promise<SecuritySettings>;

  constructor(private securitySettingsService: SecuritySettingsService) { }

  ngOnInit() {
    this.deliveryChannels = this.securitySettingsService.getSecuritySettings();
  }

}
