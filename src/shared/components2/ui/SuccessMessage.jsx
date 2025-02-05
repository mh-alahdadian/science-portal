import { CheckFat } from "@phosphor-icons/react";
import { CButton } from "components/ui/CButton";
import { Link } from "react-router-dom";

const SuccessMessage = ({ title, description, clickHandler }) => {
  return (
    <div className="flex items-center justify-center mt-4 min-h-screen">
      <div className="w-[605px] bg-light-neutral-surface-card rounded-lg flex flex-col justify-center items-center ">
        <CheckFat
          className="text-light-success-background-rest mt-5 mb-14"
          size={80}
        />
        <div className="flex flex-col gap-3 text-center">
          <p className="font-subtitle-large">{title}</p>
          <p className="font-body-medium">{description}</p>
        </div>

        <div className="flex items-center gap-4 my-12">
          <Link
            to={`/app/user/profile`}
            className="w-[255px]"
            onClick={clickHandler}
          >
            <CButton size={"lg"} mode="outline">
              اطلاعات کاربری
            </CButton>
          </Link>
          <Link
            to={`/app/advanced-search`}
            className="w-[255px]"
            onClick={clickHandler}
          >
            <CButton size={"lg"}>بازگشت به جست‌وجو</CButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
