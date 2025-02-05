import { useEffect, useState } from "react";
import {
  CaretDown,
  CheckCircle,
  PlusCircle,
  XCircle,
} from "@phosphor-icons/react";
import noteLists from "service/api/noteLists";

const DropdownWithAddOption = ({
  setNewCollectionTitle,
  collection_type,
  activeCollection,
  // loadNotes,
}) => {
  const [options, setOptions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    activeCollection || "پیش‌فرض"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const getCollections = async () => {
    try {
      const { data } = await noteLists.getCollections({
        page: 1,
        count: 10,
        collection_type,
      });
      setOptions(data?.data?.map((item) => item?.title));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCollections();
  }, []);

  const handleSelectOption = (option) => {
    setNewCollectionTitle(option);
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleAddFolderClick = () => {
    setIsAdding(true);
  };

  const handleConfirmAdd = async () => {
    if (newOption.trim()) {
      const updatedOptions = [
        "پیشفرض",
        newOption,
        ...options.filter((opt) => opt !== "پیشفرض"),
      ];
      setOptions(updatedOptions);
      setSelectedOption(newOption);
      setNewCollectionTitle(newOption);
      setIsAdding(false);
      setNewOption("");
      try {
        await noteLists.createCollection({
          title: newOption,
          collection_type,
        });
        getCollections();
      } catch (e) {
        console.log(e);
      }
    }
    setIsDropdownOpen(false);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewOption("");
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full font-body-medium my-5 relative">
      <label>نام پوشه</label>
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="outline-none border border-1 rounded-md p-2 cursor-pointer my-1 flex justify-between items-center"
      >
        <p>{selectedOption === "default" ? "پیش‌فرض" : selectedOption}</p>
        <CaretDown size={20} />
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full border border-gray-300 rounded-md bg-white shadow-md z-10 max-h-[200px] overflow-auto">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelectOption(option)}
              className={`p-2 cursor-pointer flex items-center justify-between ${
                selectedOption === option
                  ? "bg-blue-100 text-blue-600 font-bold"
                  : "hover:bg-gray-100"
              }`}
            >
              <p>{option === "default" ? "پیش‌فرض" : option}</p>
            </div>
          ))}

          {isAdding ? (
            <div className="flex gap-1 mt-2 px-2 pb-3">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="نام پوشه"
                className="border border-gray-400 p-1 rounded-md outline-none flex-grow"
              />
              <button onClick={handleConfirmAdd}>
                <CheckCircle size={20} className="text-green-500" />
              </button>
              <button onClick={handleCancelAdd}>
                <XCircle size={20} className="text-red-500" />
              </button>
            </div>
          ) : (
            <div
              onClick={handleAddFolderClick}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-blue-500"
            >
              افزودن پوشه
              <PlusCircle size={20} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownWithAddOption;
