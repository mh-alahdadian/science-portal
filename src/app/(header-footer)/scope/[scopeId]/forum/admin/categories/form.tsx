import { mutateService } from '@/api';
import { TextField } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

interface Props {
  params: any;
  closeModel: VoidFunction;
  selectedCategory: SchemaOf<'forum', 'CategoryDTO'>;
}

export function Form(props: Props) {
  const { closeModel, params, selectedCategory } = props;

  const [category, setCategory] = useState(selectedCategory);

  const { mutateAsync: addCategory } = useMutation(mutateService('post', 'forum:/v1/manager/categories'));
  const { mutateAsync: editCategory } = useMutation(mutateService('put', 'forum:/v1/manager/categories/{categoryId}'));

  function onSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    if (category.id) {
      editCategory({
        params: { query: { scopeId: params.scopeId }, path: { categoryId: category.id } },
        body: category,
      });
    } else {
      addCategory({ body: category, params: { query: { scopeId: params.scopeId } } });
    }
  }

  return (
    <form action="#" onSubmit={onSubmit}>
      <div className="mb-3">
        <span>id:</span>
        <span>{selectedCategory.id}</span>
      </div>
      <TextField
        type="text"
        id="title"
        label={'عنوان:'}
        value={category.title}
        onChange={(e) => {
          setCategory({
            ...selectedCategory,
            title: e.target.value,
          });
        }}
      />
      <button className="bg-green-700 px-4 py-2 text-white mx-4">ثبت تغییرات</button>
    </form>
  );
}
