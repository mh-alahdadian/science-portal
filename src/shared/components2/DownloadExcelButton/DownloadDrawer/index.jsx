import Drawer from "../../Drawer/index.jsx";
import { CheckCircle, FileText, Layout } from "@phosphor-icons/react";
import MediaBadge from "../../ui/MediaBadge.jsx";
import { CInput } from "../../ui/CInput.jsx";
import { CTabs } from "../../ui/CTabs.jsx";
import { useEffect, useState } from "react";
import { Checkbox } from "../../ui/Checkbox.jsx";
import PLATFORMS from "constants/platforms.js";
import { CButton } from "../../ui/CButton.jsx";
import search from "service/api/search.js";
import { notification } from "utils/helper.js";
import PropTypes from "prop-types";

const DownloadDrawer = ({ setShowDrawer, platform, q }) => {
  const [activeTab, setActiveTab] = useState("content");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [media, setMedia] = useState(platform);

  useEffect(() => {
    setMedia(platform);
  }, [platform]);

  const tabArray = [
    {
      id: "source",
      title: "منابع",
      icon: Layout,
      color: "#000000",
    },
    {
      id: "content",
      title: "محتوا",
      icon: FileText,
      color: "#000000",
    },
  ];

  const [contentCount, setContentCount] = useState(100);
  const [fileName, setFileName] = useState(
    `${activeTab} - ${new Date().toLocaleString()}`
  );
  const [validCheckList, setValidChecklist] = useState([]);

  const [checked, setChecked] = useState([
    "source",
    "datetime",
    "link",
    "content",
    "categories",
    "gender",
    "language",
    "like",
    "comment",
    "view",
    "username",
    "description",
    "posts",
    "followers",
    "following",
    "member_count",
    "link",
  ]);

  useEffect(() => {
    if (activeTab === "content") {
      setChecked([
        "source",
        "datetime",
        "link",
        "content",
        "categories",
        "gender",
        "language",
        "like",
        "comment",
        "view",
        "link",
      ]);
      switch (media) {
        case PLATFORMS.TWITTER:
          return setValidChecklist([
            { value: "source", label: "نام منبع" },
            { value: "datetime", label: "تاریخ و زمان انتشار" },
            { value: "link", label: "لینک منبع" },
            { value: "content", label: "محتوا" },
            { value: "categories", label: "دسته‌بندی" },
            { value: "gender", label: "جنسیت" },
            { value: "language", label: "زبان" },
            { value: "like", label: "تعداد لایک" },
          ]);
        case PLATFORMS.TELEGRAM:
          return setValidChecklist([
            { value: "source", label: "نام منبع" },
            { value: "datetime", label: "تاریخ و زمان انتشار" },
            { value: "link", label: "لینک منبع" },
            { value: "content", label: "محتوا" },
            { value: "categories", label: "دسته‌بندی" },
            { value: "language", label: "زبان" },
            { value: "view", label: "تعداد بازدید" },
          ]);
        case PLATFORMS.INSTAGRAM:
          return setValidChecklist([
            { value: "source", label: "نام منبع" },
            { value: "datetime", label: "تاریخ و زمان انتشار" },
            { value: "link", label: "لینک منبع" },
            { value: "content", label: "محتوا" },
            { value: "categories", label: "دسته‌بندی" },
            { value: "gender", label: "جنسیت" },
            { value: "language", label: "زبان" },
            { value: "like", label: "تعداد لایک" },
            { value: "view", label: "تعداد بازدید" },
            { value: "comment", label: "تعداد کامنت" },
          ]);
        case PLATFORMS.NEWS:
          return setValidChecklist([
            { value: "source", label: "نام منبع" },
            { value: "datetime", label: "تاریخ و زمان انتشار" },
            { value: "link", label: "لینک منبع" },
            { value: "content", label: "محتوا" },
            { value: "categories", label: "دسته‌بندی" },
          ]);
      }
    } else if (activeTab === "source") {
      setChecked([
        "source",
        "username",
        "description",
        "gender",
        "posts",
        "followers",
        "following",
        "member_count",
        "link",
      ]);
      switch (media) {
        case PLATFORMS.TWITTER:
          return setValidChecklist([
            { value: "source", label: "نام منبع" },
            { value: "username", label: "نام کاربری" },
            { value: "description", label: "توضیحات" },
            { value: "gender", label: "جنسیت" },
            { value: "posts", label: "تعداد محتوایی تولیدی" },
            { value: "followers", label: "تعداد دنبال کنندگان" },
            { value: "following", label: "تعداد دنبال شوندکان" },
          ]);
        case PLATFORMS.TELEGRAM:
          return setValidChecklist([
            { value: "source", label: "نام منبع" },
            { value: "username", label: "نام کاربری" },
            { value: "description", label: "توضیحات" },
            { value: "member_count", label: "تعداد اعضا" },
            { value: "posts", label: "تعداد محتوایی تولیدی" },
          ]);
        case PLATFORMS.INSTAGRAM:
          return setValidChecklist([
            { value: "source", label: "نام منبع" },
            { value: "username", label: "نام کاربری" },
            { value: "description", label: "توضیحات" },
            { value: "gender", label: "جنسیت" },
            { value: "posts", label: "تعداد محتوایی تولیدی" },
          ]);
        case PLATFORMS.NEWS:
          return setValidChecklist([
            { value: "source", label: "نام منبع" },
            { value: "link", label: "لینک منبع" },
            { value: "posts", label: "تعداد محتوایی تولیدی" },
          ]);
      }
    }
  }, [activeTab]);

  const handleSelectChange = (selectedItem) => {
    const { id, isChecked } = selectedItem;
    let newItems = [];

    if (isChecked) newItems = [...checked, id];
    else newItems = checked.filter((item) => item !== id);

    setChecked(newItems);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await search.exportData({
        q: q,
        platform: platform,
        type: activeTab,
        fields: checked,
        filename: fileName,
        content_count: contentCount,
      });

      if (res?.data?.status !== "OK") {
        setIsSubmitting(false);
        notification.error(`خطا در ایجاد فایل گزارش!`);
        return false;
      }
      notification.success(
        `فایل گزارش ${fileName} در حال ساخته شدن است.`,
        <CheckCircle className="text-light-success-text-rest" />
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      setShowDrawer(false);
    }
  };

  return (
    <Drawer setShowMore={setShowDrawer}>
      <div className={"container flex flex-col"}>
        <div className={"flex flex-container flex-col w-full mt-3"}>
          <h3
            className={
              "flex flex-row w-full font-subtitle-large text-light-neutral-text-high"
            }
          >
            <MediaBadge media={media} className={"ml-2"} />
            فیلد های قابل نمایش در خروجی
          </h3>
        </div>
        <div className={"w-full mt-8"}>
          <CInput
            id={"contentCount"}
            size={"md"}
            inset={true}
            state={"filled"}
            title={"تعداد رکورد در خروجی"}
            caption={"رکوردهای بیشتر باعث زمان بیشتر تولید فایل می‌شود"}
            value={contentCount.toString()}
            onChange={(e) => {
              setContentCount(e?.target?.value);
            }}
          />
        </div>
        <div className={"w-full mt-8"}>
          <CTabs
            tabArray={tabArray}
            activeTab={activeTab}
            onChange={(value) => {
              setActiveTab(value),
                setFileName(`${value} - ${new Date().toLocaleString()}`);
            }}
            className={"h-[40px]"}
          />
        </div>
        <h3
          className={
            "flex flex-row w-full font-body-bold-medium text-light-neutral-text-high mt-8"
          }
        >
          فیلد های قابل نمایش در خروجی
        </h3>

        <div className={"flex flex-wrap w-full mt-4 [direction:ltr]"}>
          {validCheckList.map((item, index) => (
            <Checkbox
              key={item.value}
              onChange={handleSelectChange}
              label={validCheckList[index].label}
              id={validCheckList[index].value}
              name={validCheckList[index].value}
              checked={checked.includes(validCheckList[index].value)}
              className={"w-1/2 mb-4"}
            />
          ))}
        </div>
        <div className={"w-full mt-8"}>
          <CInput
            id={"filename"}
            size={"md"}
            inset={true}
            state={"filled"}
            title={"نام فایل"}
            caption={"می‌توانید نام فایل را به دلخواه تغییر دهید"}
            value={fileName}
            onChange={(e) => {
              setFileName(e?.target?.value);
            }}
          />
        </div>
        <div className={"w-full mt-16"}>
          <CButton
            type={"submit"}
            size={"lg"}
            disabled={isSubmitting}
            className={"[direction:rtl] w-full"}
            onClick={handleSubmit}
          >
            تولید فایل خروجی
          </CButton>
        </div>
      </div>
    </Drawer>
  );
};

DownloadDrawer.propTypes = {
  setShowDrawer: PropTypes.func.isRequired,
  platform: PropTypes.string,
  q: PropTypes.string,
};

export default DownloadDrawer;
