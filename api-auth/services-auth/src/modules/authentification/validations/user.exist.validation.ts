import { Authentification } from "@Authentification/models/authentification.model";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { ValidateSchema } from "@Commons/validator/schema.validator";



export class UserExist {

  async validate(email: string): Promise<AuthentificationDoc | undefined> {

    return await ValidateSchema.validateExistence<AuthentificationDoc>({
      model: Authentification,
      filter: { email },
      fieldName: 'email'
    })
  }

  async validateOrFail(email: string): Promise<AuthentificationDoc> {

    return await ValidateSchema.validateExistenceOrFail<AuthentificationDoc>({
      model: Authentification,
      filter: { email },
      fieldName: 'email'
    })

  }
}