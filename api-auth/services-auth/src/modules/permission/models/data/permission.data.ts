import { ValidateRequired } from '@Commons/validator/required.validator';
import { ValidateMaxLength } from '@Commons/validator/length.max.validator';
import { ValidateMinLength } from '@Commons/validator/length.min.validator';
import { ValidateRegex } from '@Commons/validator/regex.validator';
import { lettersAndSpacesRegex } from '@Commons/constants/regex';
import { ValidateObjectId } from '@Commons/validator/object.id.validator';
import { generateSlug } from '@Commons/format/string';
import { DataBase } from '@Commons/data/data.base';

export class PermissionData extends DataBase{
  name: string = '';
  slug: string = '';
  wordSpaceId: string = ''

  getName(): string {
    return this.name;
  }

  setName(value: string): void {
    const name = 'name';
    ValidateRequired.validateOrFail({ value, name });
    ValidateMaxLength.validateOrFail({ value, maxLength: 40, name });
    ValidateMinLength.validateOrFail({ value, minLength: 5, name });
    ValidateRegex.validateOrFail({ value, name, regex: lettersAndSpacesRegex });
    this.name = value;
  }


  getSlug(): string {
    return generateSlug(this.name);
  }

}
