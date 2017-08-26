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

  constructor(editMode: boolean = false, json?: IConfiguration, type: string = 'TEXT') {
    this.editMode = editMode;
    this.type = type;
    if (json) {
      Object.assign(this, json);
    }
  }

  static compare(c1: IConfiguration, c2: IConfiguration) {
    return c1.key.localeCompare(c2.key);
  }

  private stringContainsIgnoreCase(s1: string, s2: string) {
    return s1 && (s2 || s2 === '') && s1.toUpperCase().includes(s2.toUpperCase());
  }

  shouldFilter(s: string) {
    return !(this.stringContainsIgnoreCase(this.name, s)
      || this.stringContainsIgnoreCase(this.key, s)
      || this.stringContainsIgnoreCase(this.value, s)
      || this.stringContainsIgnoreCase(this.description, s)
      || this.stringContainsIgnoreCase(this.type, s));
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
