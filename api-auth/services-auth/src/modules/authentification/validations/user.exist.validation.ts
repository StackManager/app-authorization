import { Authentification } from "@Authentification/models/authentification.model";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { ValidateSchema } from "@Commons/validator/schema.validator";

interface UserExistValidate{
  email?: any;
  _id?: any;
}

export class UserExist {

  validateData = new AuthentificationData()

  filter ({ email, _id }: UserExistValidate){
    const filter: any = { }
    if (email) {
      filter.email = email
      this.validateData.setEmail(email);
    }

    if (_id){
      filter._id = _id
      this.validateData.setId(_id);
    } 

    return filter
  }
  
  async validate({ email, _id }: UserExistValidate ): Promise<AuthentificationDoc | undefined> {
    return await ValidateSchema.validateExistence<AuthentificationDoc>({
      model: Authentification,
      filter: { ...this.filter({ email, _id }) },
      fieldName: 'email'
    })
  }

  async validateOrFail({ email, _id}: UserExistValidate): Promise<AuthentificationDoc> {
    return await ValidateSchema.validateExistenceOrFail<AuthentificationDoc>({
      model: Authentification,
      filter: { ...this.filter({ email, _id }) },
      fieldName: 'email'
    })
  }
}