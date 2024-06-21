import { Schema } from 'mongoose';
import { AuthentificationDoc } from '../interface/authentification.schema.interface';
import { AuthentificationData } from '../data/authentification.data';


export class AuthentificationMiddleware {

  static validate(schema: Schema<AuthentificationDoc>): void {

    schema.pre('validate', async function(next) {
      //console.log(this.id, this._id)
      //const data = new AuthentificationData()
      // if (!this.isNew) data.setId(this._id)
      // if (this.isNew || this.isModified('domain')) await data.setDomain(this.domain)
      // if (this.isNew || this.isModified('keySecret')) data.setKeySecret(this.keySecret)
      // if (this.isNew || this.isModified('keyPublic')) data.setKeyPublic(this.keyPublic)
      // if (this.isNew || this.isModified('name')) data.setName(this.name)
      // if (this.isNew || this.isModified('description')) data.setDescription(this.description)

      // if (this.isNew || this.isModified('domain')) this.domain = data.getDomain()
      // if (this.isNew || this.isModified('keySecret')) this.keySecret = data.getKeySecret()
      // if (this.isNew || this.isModified('keyPublic')) this.keyPublic = data.getKeyPublic()
      // if (this.isNew || this.isModified('name')) this.name = data.getName()
      // if (this.isNew || this.isModified('description')) this.description = data.getDescription()

      next();
    });

  }
}
