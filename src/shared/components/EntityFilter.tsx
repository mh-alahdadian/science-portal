import {} from '@jsonforms/vanilla-renderers';
import { JsonSchema7, Layout } from '@jsonforms/core';
import { JSONSchema7 } from 'json-schema';
import { SelectField, TextField } from '.';

const uischema: Layout | any = {
  type: 'HorizontalLayout',
  elements: [
    {
      type: 'Control',
      // label: false,
      scope: '#/properties/x',
    },
    {
      type: 'Control',
      scope: '#/properties/y',
    },
  ],
};

export function DataFilter({ schema }: { schema: JSONSchema7 & JsonSchema7 }) {
  // <JsonForms
  //   schema={schema}
  //   uischema={uischema}
  //   data={{}}
  //   renderers={vanillaRenderers}
  //   cells={vanillaCells}
  //   onChange={({ data }) => console.log(data)}
  // />
  return (
    <div className="flex gap-4">
      <TextField placeholder="جست‌و‌جو در عنوان" />
      <SelectField placeholder="ترتیب نمایش">
        <option>تازه‌ترین</option>
        <option>تاریخ فعالیت</option>
      </SelectField>
    </div>
  );
}
