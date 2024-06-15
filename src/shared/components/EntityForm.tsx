import { Theme } from '@rjsf/bootstrap-4';
import { FormProps, ThemeProps, withTheme } from '@rjsf/core';
import { FormContextType } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { EditorWidget } from './widgets';
import { AutocompleteWidget } from './widgets/AutocompleteWidget';
import { SelectWidget } from './widgets/SelectWidget';

const Theme5: ThemeProps = {
  ...Theme,
  widgets: { ...Theme.widgets, SelectWidget, autocomplete: AutocompleteWidget, editor: EditorWidget },
};

export const Form = withTheme(Theme5);

export function EntityForm<T = any>(props: Omit<FormProps<T, JsonSchema, FormContextType>, 'validator'>) {
  const Form2 = Form as any;
  return <Form2 {...props} validator={validator} />;
}

// export { Form as EntityForm };
