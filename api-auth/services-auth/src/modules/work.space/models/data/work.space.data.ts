import { ValidateRequired } from "@Commons/validator/required.validator";
import { WorkSpaceAttrs } from "../interface/work.space.schema.interface";
import { ValidateMaxLength } from "@Commons/validator/length.max.validator";
import { ValidateMinLength } from "@Commons/validator/length.min.validator";


export class WorkSpace implements WorkSpaceAttrs {
  domain: string = '';
  keySecret: string = '';
  keyPublic: string = '';
  status: boolean = false;
  name: string = '';
  description?: string;
  registrationDate: Date = new Date();
  lastUpdateDate: Date = new Date();
  deleted: boolean = false; 

  // Getter y Setter para 'domain'
  getDomain(): string {
    return this.domain;
  }
  setDomain(value: string): void {
    ValidateRequired.validateOrFail({value: value, name: 'domain'});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 100, name: 'domain'});
    ValidateMinLength.validateOrFail({value: value, minLength: 10, name: 'domain'});
    this.domain = value;
  }

  // Getter y Setter para 'keySecret'
  getKeySecret(): string {
    return this.keySecret;
  }
  setKeySecret(value: string): void {
    ValidateRequired.validateOrFail({value: value, name: 'key_secret'});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 255, name: 'key_secret'});
    ValidateMinLength.validateOrFail({value: value, minLength: 10, name: 'key_secret'});
    this.keySecret = value;
  }

  // Getter y Setter para 'key'
  getKeyPublic(): string {
    return this.keyPublic;
  }
  setKeyPublic(value: string): void {
    ValidateRequired.validateOrFail({value: value, name: 'key_public'});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 255, name: 'key_public'});
    ValidateMinLength.validateOrFail({value: value, minLength: 10, name: 'key_public'});
    this.keyPublic = value;
  }

  // Getter y Setter para 'name'
  getName(): string | undefined {
    return this.name;
  }
  setName(value: string): void {
    ValidateRequired.validateOrFail({value: value, name: 'name'});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 100, name: 'name'});
    ValidateMinLength.validateOrFail({value: value, minLength: 3, name: 'name'});
    this.name = value;
  }

  // Getter y Setter para 'description'
  getDescription(): string | undefined {
    return this.description;
  }
  setDescription(value: string): void {
    ValidateMaxLength.validateOrFail({value: value, maxLength: 255, name: 'description'});
    this.description = value;
  }
}