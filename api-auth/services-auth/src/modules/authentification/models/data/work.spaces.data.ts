import { Schema } from 'mongoose';
import { ValidateRequired } from "@Commons/validator/required.validator";
import { ValidateMaxLength } from "@Commons/validator/length.max.validator";
import { ValidateMinLength } from "@Commons/validator/length.min.validator";
import { WorkSpacesAttrs } from '../interface/authentification.schema.interface';
import { ValidatePassword } from '@Commons/validator/password.validator';
import { ValidateRegex } from '@Commons/validator/regex.validator';
import { base64PublicKeyRegex } from '@Commons/constants/regex';


export class WorkSpacesData {
  workSpaceId: Schema.Types.ObjectId | undefined;
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

  // Getter y Setter para 'password'
  getPassword(): string {
    return this.password;
  }

  setPassword(value: string): void {
    ValidatePassword.validateOrFail({ value, name: 'password' });
    this.password = value;
  }

  getAttemptsTokenActivationAccount(): number { return this.attemptsTokenActivationAccount; }
  setAttemptsTokenActivationAccount(value: any): void {
    const name = 'tokenActivationAccount'
    ValidateRequired.validateOrFail({value: value, name});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 7, name});
    ValidateMinLength.validateOrFail({value: value, minLength: 5, name});
    ValidateRegex.validateOrFail({ value, name, regex: base64PublicKeyRegex });
    this.tokenActivationAccount = value;
  }
  
  getAttemptsPasswordReset(): number { return this.attemptsPasswordReset; }
  setAttemptsPasswordReset(value: any): void {}

  getAttemptsLogin(): number { return this.attemptsLogin; }
  setAttemptsLogin(value: any): void {}

  getTokenPasswordReset(): string | undefined { return this.tokenPasswordReset; }
  setTokenPasswordReset(value: any): void {
    const name = 'tokenPasswordReset'
    ValidateRequired.validateOrFail({value: value, name});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 7, name});
    ValidateMinLength.validateOrFail({value: value, minLength: 5, name});
    ValidateRegex.validateOrFail({ value, name, regex: base64PublicKeyRegex });
    this.tokenPasswordReset = value;
  }

  getTokenActivationAccount(): string | undefined { return this.tokenActivationAccount; }
  setTokenActivationAccount(value: any): void {
    const name = 'tokenActivationAccount'
    ValidateRequired.validateOrFail({value: value, name});
    ValidateMaxLength.validateOrFail({value: value, maxLength: 7, name});
    ValidateMinLength.validateOrFail({value: value, minLength: 5, name});
    ValidateRegex.validateOrFail({ value, name, regex: base64PublicKeyRegex });
    this.tokenActivationAccount = value;
  }

  // getLangId(): Schema.Types.ObjectId { return this.langId; }
  // setLangId(value: any): void {}

  // getRoleIds(): Schema.Types.ObjectId[] { return this.roleIds; }
  // setroleIds(value: any): void {}


}