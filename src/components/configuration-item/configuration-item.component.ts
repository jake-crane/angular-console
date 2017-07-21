import { Component, Input } from '@angular/core';
import { ConfigurationsService } from '../../services/configuration-service';
import { Configuration } from '../../models/Configuration';

@Component({
    selector: 'configuration-item',
    templateUrl: './configuration-item.component.html',
    styleUrls: ['./configuration-item.component.css']
})
export class ConfigurationItemComponent {
    @Input() configuration: Configuration;
    constructor() {
        console.log(this.configuration.key);
    }
}
