import { queryService } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Select from 'react-select';

function AuthorsInput({ modalData, setAuthorValue, floatAlways }) {
  const authors = useQuery(queryService('library:/v1/authors', { params: { query: { pageable: { page: 0 } } } }));
  const [isFloat, setIsFloat] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    authors.content?.map((author) => {
      setOptions((prev) => [...prev, { value: author.id, label: `${author.firstName + ' ' + author.lastName}` }]);
    });
  }, [authors]);

  function handleChange(selectedOption) {
    setAuthorValue(selectedOption.map((item) => item.value));
    setIsFloat(selectedOption.length > 0);
  }

  return (
    <>
      <div className="flex flex-col">
        {(floatAlways || isFloat) && (
          <label htmlFor="authors" className="opacity-70 text-sm mb-1">
            نویسندگان
          </label>
        )}
        <Select
          options={options}
          onChange={handleChange}
          placeholder={floatAlways ? '' : 'نویسندگان'}
          isMulti
          defaultValue={modalData.original?.authors.map((author) => {
            return { label: `${author.firstName + ' ' + author.lastName}`, value: author.id };
          })}
        />
      </div>
    </>
  );
}

export default AuthorsInput;
