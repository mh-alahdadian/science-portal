import { useEffect, useState } from "react";
import MessengerBadge from "../../pages/user/alert-create/components/MessengerBadge";
import {
  InstagramLogo,
  Rss,
  TelegramLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import EitaaLogo from "../ui/EitaaLogo";
import { selector } from "./utils";
import PropTypes from "prop-types";

const SelectPlatform = ({ handleChange, initialValue }) => {
  const [platform, setPlatform] = useState(initialValue || []);

  useEffect(() => {
    handleChange(platform);
  }, [platform]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <MessengerBadge
        onClick={() => selector("twitter", setPlatform)}
        height={42}
        dir="row"
        name="توئیتر"
        selected={platform?.includes("twitter")}
      >
        <TwitterLogo className="size-4" color="#000000" />
      </MessengerBadge>

      <MessengerBadge
        onClick={() => selector("telegram", setPlatform)}
        height={42}
        dir="row"
        name="تلگرام"
        selected={platform?.includes("telegram")}
      >
        <TelegramLogo className="size-4" color="#000000" />
      </MessengerBadge>

      <MessengerBadge
        onClick={() => selector("news", setPlatform)}
        height={42}
        dir="row"
        name="سایت‌های خبری"
        selected={platform?.includes("news")}
      >
        <Rss className="size-4" color="#000000" />
      </MessengerBadge>

      <MessengerBadge
        onClick={() => selector("instagram", setPlatform)}
        height={42}
        dir="row"
        name="اینستاگرام"
        selected={platform?.includes("instagram")}
      >
        <InstagramLogo className="size-4" color="#000000" />
      </MessengerBadge>

      {/*<MessengerBadge*/}
      {/*  onClick={() => selector("eitaa", setPlatform)}*/}
      {/*  height={42}*/}
      {/*  dir="row"*/}
      {/*  name="ایتا"*/}
      {/*  selected={platform?.includes("eitaa")}*/}
      {/*>*/}
      {/*  <EitaaLogo color="#000000" />*/}
      {/*</MessengerBadge>*/}
    </div>
  );
};

SelectPlatform.propTypes = {
  handleChange: PropTypes.func.isRequired,
  initialValue: PropTypes.array,
};

export default SelectPlatform;
