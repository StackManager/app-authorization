
import { ValidateRequired } from "@Commons/validator/required.validator";
import { ValidateMaxLength } from "@Commons/validator/length.max.validator";
import { ValidateMinLength } from "@Commons/validator/length.min.validator";
import { WorkSpacesData } from "./work.spaces.data";
import { ValidateRegex } from "@Commons/validator/regex.validator";
import { emailRegex } from "@Commons/constants/regex";


export class AuthentificationData {
  email: string = '';
  workSpaces: WorkSpacesData;

  constructor (){
    this.workSpaces = new WorkSpacesData();
  }


  // Getter y Setter para 'email'
  getEmail(): string {
    return this.email;
  }

  setEmail(value: string): void {
    const name = 'email'
    ValidateRequired.validateOrFail({ value, name });
    ValidateMaxLength.validateOrFail({ value, maxLength: 40, name });
    ValidateMinLength.validateOrFail({ value, minLength: 5, name });
    ValidateRegex.validateOrFail({ value, name, regex: emailRegex });
    this.email = value;
  }

}

  // // Método para obtener el filtro de ID
  // private getFilterId() {
  //   return {};
  // }

  //const filter = { email: value, ...this.getFilterId() }
  //await ValidateSchema.validateUniqueField({ filter, model: Authentification, fieldName: 'email' });

  // // Métodos para la manipulación de 'domains'
  // addDomain(domain: WorkSpacesData): void {
  //   this.workSpaces.push(domain);
  // }

  // getDomains(): WorkSpacesData[] {
  //   return this.workSpaces;
  // }