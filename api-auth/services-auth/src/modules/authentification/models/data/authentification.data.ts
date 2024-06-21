
import { ValidateRequired } from "@Commons/validator/required.validator";
import { ValidateMaxLength } from "@Commons/validator/length.max.validator";
import { ValidateMinLength } from "@Commons/validator/length.min.validator";
import { Authentification } from "../authentification.model";
import { ValidateSchema } from "@Commons/validator/schema.validator";
import { AuthentificationAttrs } from "../interface/authentification.schema.interface";
import { WorkSpacesData } from "./work.spaces.data";


export class AuthentificationData implements AuthentificationAttrs {
  email: string;
  workSpaces: WorkSpacesData[] = [];

  constructor(email: string) {
    this.email = email;
  }

  // Getter y Setter para 'email'
  getEmail(): string {
    return this.email;
  }

  async setEmail(value: string): Promise<void> {
    ValidateRequired.validateOrFail({ value, name: 'email' });
    ValidateMaxLength.validateOrFail({ value, maxLength: 255, name: 'email' });
    ValidateMinLength.validateOrFail({ value, minLength: 5, name: 'email' });
    const filter = { email: value, ...this.getFilterId() }
    await ValidateSchema.validateUniqueField({ filter, model: Authentification, fieldName: 'email' });
    this.email = value;
  }

  // Métodos para la manipulación de 'domains'
  addDomain(domain: WorkSpacesData): void {
    this.workSpaces.push(domain);
  }

  getDomains(): WorkSpacesData[] {
    return this.workSpaces;
  }

  // Método para obtener el filtro de ID
  private getFilterId() {
    return {};
  }
}