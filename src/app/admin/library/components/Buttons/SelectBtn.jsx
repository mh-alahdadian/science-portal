import { Check } from '@phosphor-icons/react';

function SelectBtn({ setSelectedItems, selectedItems, bookData }) {
  function handleSelect() {
    if (selectedItems.includes(bookData)) {
      setSelectedItems(selectedItems.filter((item) => item.id != bookData.id));
    } else setSelectedItems((prev) => [...prev, bookData]);
  }

  return (
    <>
      <div
        className="w-4 h-4 cursor-pointer rounded-full border border-dark m-auto flex items-center justify-center"
        onClick={handleSelect}
        style={{ backgroundColor: selectedItems.includes(bookData) ? 'black' : 'transparent' }}
      >
        {selectedItems.includes(bookData) && <Check />}
      </div>
    </>
  );
}

export default SelectBtn;
