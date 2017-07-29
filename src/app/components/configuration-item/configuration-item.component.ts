import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Configuration } from '../../models/Configuration';

@Component({
    selector: '[app-configuration-item]',
    templateUrl: './configuration-item.component.html',
    styleUrls: ['./configuration-item.component.css']
})
export class ConfigurationItemComponent {
    @Input() readonly configuration: Configuration;
    @Input() readonly isNewConfiguration: boolean;
    @Output() addEvent: EventEmitter<any> = new EventEmitter();
    @Output() updateEvent: EventEmitter<any> = new EventEmitter();
    @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
    private backupConfiguration: Configuration;

    editConfiguration() {
        this.backupConfiguration = {...this.configuration} as Configuration;
        this.configuration.editMode = true;
    }

    cancelConfigurationEdit() {
        Object.assign(this.configuration, this.backupConfiguration);
        this.configuration.editMode = false;
    }

    saveConfiguration() {
        this.updateEvent.emit();
    }

    deleteConfiguration() {
        this.deleteEvent.emit();
    }

    addConfiguration() {
        this.addEvent.emit();
    }
}
