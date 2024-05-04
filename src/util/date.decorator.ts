import { Transform, TransformFnParams } from 'class-transformer';
import * as moment from 'moment-timezone';

export function DateFormat(format: string): PropertyDecorator {
  return Transform((params: TransformFnParams) => {
    const value = params.value;
    if (value instanceof Date) {
      return moment(value).tz('Asia/Seoul').format(format);
    }
    return value;
  });
}
