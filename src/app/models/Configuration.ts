export class Configuration {
    name: string;
    key: string;
    value: string;
    description: string;
    type: string;
    id: number;
    editMode: boolean;

    constructor(editMode: boolean) {
        this.editMode = editMode;
    }
}