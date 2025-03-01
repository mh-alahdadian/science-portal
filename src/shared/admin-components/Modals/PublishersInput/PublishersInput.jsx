import { queryService } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Select from 'react-select';

function PublishersInput({ modalData, setPublisherValue, floatAlways }) {
  const { data: publishers } = useQuery(queryService('library:/v1/publishers', {}));
  const [isFloat, setIsFloat] = useState(false);

  const options = publishers.content?.map((publisher) => ({ value: publisher.id, label: publisher.name }));

  function handleChange(selectedOption) {
    setPublisherValue(selectedOption.value);
    setIsFloat(!!selectedOption);
  }

  return (
    <>
      <div className="flex flex-col flex-1">
        {(floatAlways || isFloat) && (
          <label htmlFor="publisher" className="opacity-70 text-sm mb-1">
            ناشر
          </label>
        )}
        <Select
          options={options}
          onChange={handleChange}
          placeholder={floatAlways ? '' : 'ناشر'}
          defaultInputValue={modalData.original ? modalData.original.publisher.name : ''}
        />
      </div>
    </>
  );
}

export default PublishersInput;
