import { UserFocus } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { ResourceSearchInput } from "../../ui/SearchInput.jsx";

export const FilterResource = ({ platform, handleChange }) => {
  return (
    <>
      <div className="flex items-center">
        <h3 className={`text-light-neutral-text-high font-overline-large ml-2`}>
          منابع
        </h3>
        <UserFocus size={15} className={`text-light-neutral-text-low ml-2`} />
      </div>
      <div className={"w-full flex mt-4"}>
        <ResourceSearchInput
          id={"sources"}
          name={"sources"}
          inset={true}
          size={"lg"}
          validation={"none"}
          direction={"rtl"}
          placeholder={"نام حساب کاربری یا خبرگزاری و ... را جست‌وجو کنید"}
          className={"flex-1"}
          field={{}}
          platform={platform}
          onChange={handleChange}
          form={{ errors: [], touched: [] }}
        />
      </div>
    </>
  );
};

FilterResource.propTypes = {
  platform: PropTypes.string,
  handleChange: PropTypes.func,
};
