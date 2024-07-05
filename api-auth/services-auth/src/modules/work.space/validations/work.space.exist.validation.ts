import { ValidateSchema } from "@Commons/validator/schema.validator";
import { WorkSpaceDoc } from "@WorkSpace/models/interface/work.space.schema.interface";
import { WorkSpace } from "@WorkSpace/models/work.space.model";


export class WorkSpaceExist {

  async validateOrFail(keyPublic: string): Promise<WorkSpaceDoc> {

    return await ValidateSchema.validateExistenceOrFail<WorkSpaceDoc>({
      model: WorkSpace,
      filter: { keyPublic },
      fieldName: 'domain'
    })

  }

}
