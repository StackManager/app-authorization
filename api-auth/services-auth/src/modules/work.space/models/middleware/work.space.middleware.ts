import { Schema } from 'mongoose';
import { WorkSpaceDoc } from '../interface/work.space.schema.interface';


export class workSpaceMiddleware {

  static validate(schema: Schema<WorkSpaceDoc>): void {

    schema.pre('validate', async function(next) {



      next();
    });

  }
}
