import { queryService } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Select from 'react-select';

function TranslatorsInput({ modalData, setTranslatorValue, floatAlways }) {
  const { data: authors } = useQuery(queryService('library:/v1/authors'));
  const [isFloat, setIsFloat] = useState(false);
  const options = authors.content?.map((author) => ({
    value: author.id,
    label: `${author.firstName} ${author.lastName}`,
  }));

  function handleChange(selectedOption) {
    setTranslatorValue(selectedOption.map((item) => item.value));
    setIsFloat(selectedOption.length > 0);
  }

  return (
    <>
      <div className="flex flex-col">
        {(floatAlways || isFloat) && (
          <label htmlFor="translators" className="opacity-70 text-sm mb-1">
            مترجمان
          </label>
        )}
        <Select
          options={options}
          onChange={handleChange}
          placeholder={floatAlways ? '' : 'مترجمان'}
          isMulti
          defaultValue={modalData.original?.translators.map((translator) => {
            return { label: `${translator.firstName + ' ' + translator.lastName}`, value: translator.id };
          })}
        />
      </div>
    </>
  );
}
export default TranslatorsInput;
