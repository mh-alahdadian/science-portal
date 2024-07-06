// See https://github.com/rjsf-team/react-jsonschema-form/pull/2887/files#diff-b51e893c9f8a0244c2806c0256561cff0261e2774247ec4232218082fc2dc952
import { WidgetProps, asNumber } from '@rjsf/utils';
import { useState } from 'react';

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
    <div className="dropdown">
      <input placeholder="Pick a country" value={search} onChange={(e) => setSearch(e.target.value)} />
      {data.length ? (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box w-60 max-h-80 flex-nowrap overflow-auto"
        >
          {data.map((item: any) => (
            <li className="list-item" key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
