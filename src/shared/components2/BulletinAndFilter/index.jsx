import Title from "./Title";
import Subtitle from "./Subtitle";
import TopicFiltersDetails from "./TopicFiltersDetails";
import BulletinBadge from "../../pages/user/bulletin-create/components/BulletinBadge";
import testImg from "/public/bulletin-stats/sentiment.png";

const BulletinAndFilter = ({
  data,
  selectFilter,
  showReceivingPlatform = true,
  isFilter = true,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-8">
        <Title>
          <p className="font-body-medium w-36">اطلاعات بولتن </p>
        </Title>
        {data.title && (
          <Subtitle subtitle={"عنوان بولتن"}>
            <p className="font-body-large">{data.title}</p>
          </Subtitle>
        )}

        {data.description && (
          <Subtitle subtitle={"توضیحات بولتن"}>
            <p className="font-body-large">{data.description}</p>
          </Subtitle>
        )}

        {data.q && (
          <Subtitle subtitle="کلمات کلیدی">
            <p className="font-body-large">{data.q}</p>
          </Subtitle>
        )}
      </div>

      {showReceivingPlatform && (
        <div className="flex flex-col gap-4 mb-8">
          <Title>
            <p className="font-body-medium w-36">محتوا</p>
          </Title>
          <div className="flex items-center justify-between">
            <Subtitle subtitle="محتوای انتخاب شده" />
            <div className="flex items-center gap-1">
              <BulletinBadge img={testImg} />
              <BulletinBadge img={testImg} />
              <BulletinBadge img={testImg} />
            </div>
          </div>
        </div>
      )}

      {data.platform && (
        <>
          {Object?.entries(data?.platform).map(([platform, value], index) => (
            <TopicFiltersDetails
              key={index}
              data={value}
              selectFilter={selectFilter}
              platform={platform}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default BulletinAndFilter;
