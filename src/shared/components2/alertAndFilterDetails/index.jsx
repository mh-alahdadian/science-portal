import Title from "./Title";
import Subtitle from "./Subtitle";
import MediaBadge from "../ui/MediaBadge";
import TopicFiltersDetails from "./TopicFiltersDetails";

const AlertAndFilterDetails = ({
  data,
  selectFilter,
  showReceivingPlatform = true,
  isFilter = true,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-8">
        <Title>
          <p className="font-body-medium w-36">
            {isFilter ? "اطلاعات فیلتر" : "اطلاعات هشدار"}
          </p>
        </Title>
        {data.title && (
          <Subtitle subtitle={isFilter ? "عنوان فیلتر" : "عنوان هشدار"}>
            <p className="font-body-large">{data.title}</p>
          </Subtitle>
        )}

        {data.description && (
          <Subtitle subtitle={isFilter ? "توضیحات فیلتر" : "توضیحات هشدار"}>
            <p className="font-body-large">{data.description}</p>
          </Subtitle>
        )}

        {data.q && (
          <Subtitle subtitle="کلمات کلیدی">
            <p className="font-body-large">{data.q}</p>
          </Subtitle>
        )}

        {data.receiver && (
          <Subtitle subtitle="دریافت کننده">
            <p className="font-body-large">{data.receiver}</p>
          </Subtitle>
        )}
      </div>

      {showReceivingPlatform && (
        <div className="flex flex-col gap-4 mb-8">
          <Title>
            {" "}
            <p className="font-body-medium w-36"> بستر دریافت مطالب </p>
          </Title>
          <Subtitle subtitle="بستر دریافت">
            <MediaBadge media={data.messenger} showMediaName />
          </Subtitle>
          <Subtitle subtitle="شناسه کانال یا شخص">
            <p className="font-body-large flex flex-row-reverse items-center">
              <span>{data.channel_id}</span>
            </p>
          </Subtitle>
        </div>
      )}

      {data.platform && (
        <>
          {Object?.entries(data?.platform)?.map(([platform, value], index) => (
            <TopicFiltersDetails
              key={index}
              data={value}
              selectFilter={selectFilter}
              platform={platform}
            />
          ))}
        </>
      )}

      {/* <TopicFiltersDetails data={data} selectFilter={selectFilter} /> */}
    </div>
  );
};

export default AlertAndFilterDetails;
