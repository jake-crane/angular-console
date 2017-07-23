import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfigurationService } from '../../services/configuration.service';
import { Configuration } from '../../models/Configuration';

@Component({
    selector: '[app-configuration-item]',
    templateUrl: './configuration-item.component.html',
    styleUrls: ['./configuration-item.component.css']
})
export class ConfigurationItemComponent {
    @Input() readonly configuration: Configuration;
    @Output() addEvent: EventEmitter<any> = new EventEmitter();
    @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
    backupConfiguration: Configuration;

    constructor() {
    }

    editConfiguration() {
        this.backupConfiguration = {...this.configuration};
        this.configuration.editMode = true;
    }

    cancelConfigurationEdit() {
        Object.assign(this.configuration, this.backupConfiguration);
        this.configuration.editMode = false;
    }

    saveConfiguration() {
        this.configuration.editMode = false;
    }

    deleteConfiguration() {
        this.deleteEvent.emit();
    }

    addConfiguration() {
        this.configuration.editMode = false;
        this.addEvent.emit();
    }
}
