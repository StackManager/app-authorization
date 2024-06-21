import { Schema } from 'mongoose';
import { ValidateRequired } from "@Commons/validator/required.validator";
import { ValidateMaxLength } from "@Commons/validator/length.max.validator";
import { ValidateMinLength } from "@Commons/validator/length.min.validator";
import { WorkSpacesAttrs } from '../interface/authentification.schema.interface';


export class WorkSpacesData implements WorkSpacesAttrs {
  workSpaceId: Schema.Types.ObjectId;
  password: string = '';
  status: boolean = false;
  session?: string = undefined;
  dateBlock?: Date | null = null;
  tokenPasswordReset?: string  = undefined;
  tokenActivationAccount?: string  = undefined;
  attemptsTokenActivationAccount: number = 0;
  attemptsPasswordReset: number = 0;
  attemptsLogin: number = 0;
  deleted: boolean = false;
  //langId: Schema.Types.ObjectId;
  //roleIds: Schema.Types.ObjectId[] = [];

  constructor(
    workSpaceId: Schema.Types.ObjectId, 
    //langId: Schema.Types.ObjectId, 
    //roleIds: Schema.Types.ObjectId[]
  ) {
    this.workSpaceId = workSpaceId;
    //this.langId = langId;
    //this.roleIds = roleIds;
  }

  // Getter y Setter para 'password'
  getPassword(): string {
    return this.password;
  }

  setPassword(value: string): void {
    ValidateRequired.validateOrFail({ value, name: 'password' });
    ValidateMaxLength.validateOrFail({ value, maxLength: 255, name: 'password' });
    ValidateMinLength.validateOrFail({ value, minLength: 8, name: 'password' });
    this.password = value;
  }

  getAttemptsTokenActivationAccount(): number { return this.attemptsTokenActivationAccount; }
  setAttemptsTokenActivationAccount(value: any): void {}
  
  getAttemptsPasswordReset(): number { return this.attemptsPasswordReset; }
  setAttemptsPasswordReset(value: any): void {}

  getAttemptsLogin(): number { return this.attemptsLogin; }
  setAttemptsLogin(value: any): void {}

  getTokenPasswordReset(): string | undefined { return this.tokenPasswordReset; }
  setTokenPasswordReset(value: any): void {}

  getTokenActivationAccount(): string | undefined { return this.tokenActivationAccount; }
  setTokenActivationAccount(value: any): void {}

  // getLangId(): Schema.Types.ObjectId { return this.langId; }
  // setLangId(value: any): void {}

  // getRoleIds(): Schema.Types.ObjectId[] { return this.roleIds; }
  // setroleIds(value: any): void {}


}