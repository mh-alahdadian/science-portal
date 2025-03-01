import { queryService } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Select from 'react-select';

function CategoryInput({ modalData, setCategoryValue, multi, floatAlways }) {
  const { data: categories } = useQuery(queryService('library:/v1/categories', {}));
  const [isFloat, setIsFloat] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(categories.map((category) => ({ value: category.id, label: category.title })));
  }, [categories]);

  function handleChange(selectedOption) {
    if (multi) {
      const arr = selectedOption.map((item) => item.value);
      setCategoryValue(arr);
    } else {
      setCategoryValue(selectedOption.value);
    }

    setIsFloat(selectedOption.length > 0);
  }

  return (
    <>
      <div className="flex flex-col flex-1">
        {(floatAlways || isFloat) && (
          <label htmlFor="category" className="opacity-70 text-sm mb-1">
            دسته بندی
          </label>
        )}
        <Select
          options={options}
          onChange={handleChange}
          placeholder={floatAlways ? '' : 'دسته بندی'}
          isMulti={multi}
          defaultInputValue={modalData.original ? modalData.original.category.title : ''}
        />
      </div>
    </>
  );
}

export default CategoryInput;
