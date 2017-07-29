interface IConfiguration {
    name: string;
    key: string;
    value: string;
    description: string;
    type: string;
    id: number;
}

export class Configuration implements IConfiguration {
    name: string;
    key: string;
    value: string;
    description: string;
    type: string;
    id: number;
    editMode: boolean;
    hidden: boolean;

    constructor(editMode: boolean = false, json?: IConfiguration) {
        this.editMode = editMode;
        if (json) {
            Object.assign(this, json);
        }
    }

    static compare(c1: IConfiguration, c2: IConfiguration) {
        return c1.key.localeCompare(c2.key);
    }

    toJSON(): IConfiguration {
        return {
            name: this.name,
            key: this.key,
            value: this.value,
            description: this.description,
            type: this.type,
            id: this.id
        } as IConfiguration;
    }

}
