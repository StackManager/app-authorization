import { ValidateRequired } from "@Commons/validator/required.validator";
import { WorkSpaceAttrs } from "../interface/work.space.schema.interface";
import { ValidateMaxLength } from "@Commons/validator/length.max.validator";
import { ValidateMinLength } from "@Commons/validator/length.min.validator";
import { WorkSpace } from "../work.space.model";
import { ValidateSchema } from "@Commons/validator/schema.validator";
import { ValidateRegex } from "@Commons/validator/regex.validator";
import { base64PublicKeyRegex } from "@Commons/constants/regex";


export class WorkSpaceData {

  
  id: string | undefined;
  domain: string = '';
  keySecret: string = '';
  keyPublic: string = '';
  status: boolean = false;
  name: string = '';
  description?: string;
  maxAttemptsTokenActivationAccount: number = 0;
  maxAttemptsPasswordReset: number = 0;
  maxAttemptsLogin: number = 0;
  registrationDate: Date = new Date();
  lastUpdateDate: Date = new Date();
  deleted: boolean = false; 


  setId(value: any){
    this.id = value;
  }

  getFilterId(){
    if (!this.id) return {}
    return { _id: { $ne: this.id }}
  }

  // Getter y Setter para 'domain'
  getDomain(): string {
    return this.domain;
  }


  async setDomain(value: any): Promise<void> {
    ValidateRequired.validateOrFail({value: value, name: 'domain'});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 100, name: 'domain'});
    ValidateMinLength.validateOrFail({value: value, minLength: 10, name: 'domain'});
    const filter = { domain: value, ...this.getFilterId() }
    await ValidateSchema.validateUniqueField({ filter, model: WorkSpace, fieldName: 'domain'});
    this.domain = value;
  }

  // Getter y Setter para 'keySecret'
  getKeySecret(): string {
    return this.keySecret;
  }
  setKeySecret(value: any): void {
    const name = 'key_secret'
    ValidateRequired.validateOrFail({value: value, name});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 255, name});
    ValidateMinLength.validateOrFail({value: value, minLength: 10, name});
    ValidateRegex.validateOrFail({ value, name, regex: base64PublicKeyRegex });
    this.keySecret = value;
  }

  // Getter y Setter para 'key'
  getKeyPublic(): string {
    return this.keyPublic;
  }
  setKeyPublic(value: any): void {
    const name = 'key_public'
    ValidateRequired.validateOrFail({value: value, name});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 255, name});
    ValidateMinLength.validateOrFail({value: value, minLength: 10, name});
    ValidateRegex.validateOrFail({ value, name, regex: base64PublicKeyRegex });
    this.keyPublic = value;
  }

  // Getter y Setter para 'name'
  getName(): string {
    return this.name;
  }
  setName(value: any): void {
    ValidateRequired.validateOrFail({value: value, name: 'name'});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 100, name: 'name'});
    ValidateMinLength.validateOrFail({value: value, minLength: 3, name: 'name'});
    this.name = value;
  }

  // Getter y Setter para 'description'
  getDescription(): string | undefined {
    return this.description;
  }
  setDescription(value:  string | undefined ): void {
    ValidateMaxLength.validateOrFail({value: value, maxLength: 255, name: 'description'});
    this.description = value;
  }
}