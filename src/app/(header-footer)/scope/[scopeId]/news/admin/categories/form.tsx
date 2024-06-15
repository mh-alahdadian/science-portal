import { mutateService } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  params: any;
  closeModel: VoidFunction;
  selectedCategory: SchemaOf<'news', 'CategoryDTO'>;
}

export function Form(props: Props) {
  const { closeModel, params, selectedCategory } = props;

  const [category, setCategory] = useState(selectedCategory);

  const { mutate } = useMutation(mutateService('put', 'news:/v1/manager/{page}/categories/{categoryId}'));

  function onSubmit() {
    // bayad check beshe
    // mutate({ params: { path: props.scopeId, query: { enable: true } } })
  }

  return (
    <form action="#" onSubmit={onSubmit}>
      <div className="mb-3">
        <span>id:</span>
        <span>{selectedCategory.id}</span>
      </div>
      <div className="mb-3 ">
        <label htmlFor="title">عنوان:</label>
        <input
          type="text"
          id="title"
          value={category.title}
          onChange={(e) => {
            setCategory({
              ...selectedCategory,
              title: e.target.value,
            });
          }}
        />
      </div>
      <button className="btn bg-green-700 px-4 py-2 text-white mx-4">ثبت تغییرات</button>
    </form>
  );
}
