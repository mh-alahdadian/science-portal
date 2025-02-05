import { TelegramLogo, InstagramLogo, Rss, XLogo } from "@phosphor-icons/react";
import EitaaLogo from "../ui/EitaaLogo";
import BaleLogoWhite from "../ui/BaleLogoWhite";
import PropTypes from "prop-types";

const MediaBadge = ({
  showMediaName = false,
  media,
  reverse = false,
  className = "",
  size = "normal",
}) => {
  const selectMedia = {
    telegram: {
      logo: <TelegramLogo size={size === "big" ? 24 : 16} />,
      bgColor: "#0084C7",
      mediaName: "تلگرام",
    },
    twitter: {
      // logo: <TwitterLogo size={size==="big"? 24 : 16} />,
      logo: <XLogo size={size === "big" ? 24 : 16} />,
      // bgColor: "#54ADEE",
      bgColor: "#000000",
      mediaName: "ایکس",
    },
    instagram: {
      logo: <InstagramLogo size={size === "big" ? 24 : 16} />,
      bgColor: "#E64787",
      mediaName: "اینستاگرام",
    },
    news: {
      logo: <Rss size={size === "big" ? 24 : 16} />,
      bgColor: "#ECA213",
      mediaName: "خبرگزاری",
    },
    eitaa: {
      logo: <EitaaLogo size={size === "big" ? 24 : 16} />,
      bgColor: "#E67920",
      mediaName: "ایتا",
    },
    bale: {
      logo: <BaleLogoWhite size={size === "big" ? 24 : 16} />,
      bgColor: "#41A59C",
      mediaName: "بله",
    },
  };
  return (
    <div
      className={`flex justify-center items-center gap-1 rounded-lg py-[2px] px-2 text-light-neutral-text-white h-6 ${className}`}
      style={{
        backgroundColor: selectMedia[media]?.bgColor,
        ...(reverse ? { flexDirection: "row-reverse" } : {}),
        ...(!showMediaName ? { width: "24px" } : {}),
        ...(size === "big" ? { width: "40px", height: "40px " } : {}),
      }}
    >
      {showMediaName && (
        <span
          className="font-overline-medium"
          style={{ color: "white", fontSize: "12px" }}
        >
          {selectMedia[media]?.mediaName}
        </span>
      )}
      <div>{selectMedia[media]?.logo}</div>
    </div>
  );
};

MediaBadge.propTypes = {
  showMediaName: PropTypes.bool,
  media: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  reverse: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.string,
};

export default MediaBadge;
