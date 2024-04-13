import { JsonSchema7 } from '@jsonforms/core';
import { RJSFSchema } from '@rjsf/utils';

declare global {
  export type JsonSchema = RJSFSchema & JsonSchema7;
}
