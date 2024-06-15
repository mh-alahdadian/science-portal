// See https://github.com/rjsf-team/react-jsonschema-form/pull/2887/files#diff-b51e893c9f8a0244c2806c0256561cff0261e2774247ec4232218082fc2dc952
import { WidgetProps, asNumber } from '@rjsf/utils';
import { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const nums = new Set(['number', 'integer']);

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
const processValue = (schema: any, value: any) => {
  const { type, items } = schema;
  if (value === '') {
    return undefined;
  } else if (type === 'array' && items && nums.has(items.type)) {
    return value.map(asNumber);
  } else if (type === 'number') {
    return asNumber(value);
  }

  return value;
};

export const AutocompleteWidget = ({
  schema,
  id,
  options,
  disabled,
  value,
  multiple = false,
  autofocus,
  onChange,
  rawErrors = [],
}: WidgetProps) => {
  const { useOptions } = options as any;

  const emptyValue = multiple ? [] : '';

  const [search, setSearch] = useState<string>();
  const { data, isLoading } = useOptions(search);

  return (
    <AsyncTypeahead
      id={id}
      selected={typeof value === 'undefined' ? emptyValue : value.filter(Boolean)}
      isLoading={isLoading}
      options={data || []}
      labelKey="login"
      multiple={multiple}
      disabled={disabled}
      autoFocus={autofocus}
      className={rawErrors.length > 0 ? 'is-invalid' : ''}
      onChange={(event: any) => {
        const newValue = event.target.value;
        onChange(processValue(schema, newValue));
      }}
      onSearch={setSearch}
    />
  );
};
