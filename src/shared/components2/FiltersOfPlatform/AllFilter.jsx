import SelectLanguage from "../FilterSelector/SelectLanguage";
import Divider from "../ui/Divider";
import SelectCategory from "../FilterSelector/SelectCategory";
import { setCategorie, setLanguage } from "../../utils/setFilters";

const AllFilter = ({ setData, initialValue }) => {
  return (
    <div>
      <div>
        <p className="font-overline-large mb-4">زبان</p>
        <SelectLanguage
          initialValue={initialValue?.languages}
          handleChange={(x) => setLanguage("all", x, setData)}
        />
      </div>

      <div className="my-6">
        <Divider />
      </div>

      <div>
        <p className="font-overline-large mb-4">دسته‌بندی موضوعی</p>
        <SelectCategory
          initialValue={initialValue?.categories}
          handleChange={(x) => setCategorie("all", x, setData)}
        />
      </div>
    </div>
  );
};

export default AllFilter;
