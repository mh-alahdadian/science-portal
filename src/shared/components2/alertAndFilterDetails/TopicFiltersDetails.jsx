import AlertAndFilterDetailsBadge from "./AlertAndFilterDetailsBadge";
import Title from "./Title";
import Subtitle from "./Subtitle";
import MediaBadge from "../ui/MediaBadge";
import { SUBJECT_CATEGORIES } from "constants/subject-category.js";
import { LANGUAGES } from "constants/languages.js";
import { SENTIMENTS } from "constants/sentiments.js";

const TopicFiltersDetails = ({
  data,
  showTitle = true,
  bg,
  rounded,
  padding,
  selectFilter = "",
  platform,
}) => {
  const gender = {
    all: "همه",
    male: "مرد",
    female: "زن",
    unk: "نامشخص",
  };

  const contain_copy = {
    all: "همه",
    publish: "تولیدی",
    republish: "بازنشر",
  };

  return (
    <div
      className={`w-full flex flex-col gap-4 mb-8 ${
        bg && "bg-light-neutral-surface-highlight"
      } ${rounded && "rounded-lg"} ${padding && "p-6"}`}
    >
      {showTitle && (
        <>
          <Title>
            <MediaBadge media={platform} showMediaName />
          </Title>
          {selectFilter && (
            <Subtitle subtitle="نوع فیلتر">
              <p className="font-body-large">
                {selectFilter === "new-filter" ? "جدید" : "پیش‌ساخته"}
              </p>
            </Subtitle>
          )}
        </>
      )}
      <Subtitle subtitle="زبان">
        <div className="flex gap-1 font-body-large">
          {data?.languages?.map((item, index, arr) => (
            <AlertAndFilterDetailsBadge>
              {LANGUAGES.find(({ value }) => value === item)?.label || "---"}
            </AlertAndFilterDetailsBadge>
          ))}
        </div>
      </Subtitle>
      {/* <Subtitle subtitle="منابع">
        <div className="flex gap-1">
          <AlertAndFilterDetailsBadge media="telegram">
            ممدیان
          </AlertAndFilterDetailsBadge>
          <AlertAndFilterDetailsBadge media="news">
            خبرگزاری ممد اینا
          </AlertAndFilterDetailsBadge>
        </div>
      </Subtitle> */}
      {data?.contain_copy?.length > 0 && (
        <Subtitle subtitle="اصالت محتوا">
          <div className="flex gap-1">
            {data?.contain_copy?.map((item) => (
              <AlertAndFilterDetailsBadge>
                {contain_copy[item]}
              </AlertAndFilterDetailsBadge>
            ))}
          </div>
        </Subtitle>
      )}
      {/* <Subtitle subtitle="ضریب نفوذ اهمیت">
        <p className="font-body-large">۶</p>
      </Subtitle> */}
      {data?.sentiment?.length > 0 && (
        <Subtitle subtitle="تحلیل احساسات">
          <div className="flex gap-1">
            {data?.sentiment?.map((item) => {
              const sentiment = SENTIMENTS.find(({ value }) => value === item);
              const Icon = sentiment?.icon;
              return (
                <AlertAndFilterDetailsBadge key={item}>
                  {Icon && (
                    <Icon className={`ml-2 ${sentiment.className}`} size={16} />
                  )}
                  {sentiment?.label || "---"}
                </AlertAndFilterDetailsBadge>
              );
            })}
          </div>
        </Subtitle>
      )}
      {!!data?.categories?.length && (
        <Subtitle subtitle="دسته‌بندی موضوعی">
          <div className="flex gap-1">
            {data?.categories?.map((item) => (
              <AlertAndFilterDetailsBadge>
                {SUBJECT_CATEGORIES.find(({ value }) => value === item)
                  ?.label || "---"}
              </AlertAndFilterDetailsBadge>
            ))}
          </div>
        </Subtitle>
      )}
      {data?.gender?.length > 0 && (
        <Subtitle subtitle="جنسیت کاربران">
          <div className="flex gap-1">
            {data?.gender?.map((item) => (
              <AlertAndFilterDetailsBadge>
                {gender[item]}
              </AlertAndFilterDetailsBadge>
            ))}
          </div>
        </Subtitle>
      )}
      {data?.hashtags?.length > 0 && (
        <Subtitle subtitle="هشتگ‌ها">
          <div className="flex gap-1">
            {data?.hashtags?.map((item) => (
              <AlertAndFilterDetailsBadge>{item}</AlertAndFilterDetailsBadge>
            ))}
          </div>
        </Subtitle>
      )}
      {data?.sources?.length > 0 && (
        <Subtitle subtitle="منابع">
          <div className="flex gap-1">
            {data?.sources?.map((item) => (
              <AlertAndFilterDetailsBadge>
                {item.name}
              </AlertAndFilterDetailsBadge>
            ))}
          </div>
        </Subtitle>
      )}
    </div>
  );
};

export default TopicFiltersDetails;
