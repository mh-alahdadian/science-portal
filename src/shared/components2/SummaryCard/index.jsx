import { useState } from "react";
import {
  Eye,
  ChatTeardropDots,
  Heart,
  Repeat,
  BookmarkSimple,
  CheckCircle,
  BookBookmark,
  Bookmark,
} from "@phosphor-icons/react";
import MediaBadge from "../ui/MediaBadge";
import PropTypes from "prop-types";
import { parseNumber, parseTimeToPersian } from "utils/helper";
import SummaryCardHeaderMenu from "pages/user/hot-topic/components/SummaryCardTopic/SummaryCardHeaderMenu.jsx";
import bookmark from "service/api/bookmark.js";
import { notification } from "utils/helper.js";
import DeletePopUp from "../ui/DeletePopUp";

const SummaryCard = ({
  children,
  media,
  data,
  platform = false,
  showMediaName,
  isShowMore = false,
  showHeaderMenu = true,
  height,
  handleClickOnAvatar,
  selectable = false,
  handleSelect,
  isSelected,
  showBookMark = false,
  setMyBookmarksLists,
  isDrawer = false,
  hasNotes,
  is_pin,
  setUpdater,
  isDropdownOpen,
  is360 = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState(null); // Store the bookmark ID

  const selectMedia = {
    telegram: {
      avatar: data?.avatar || "/logo_small.png",
      sub: [
        {
          icon: <Eye color="#256EF6" weight="fill" />,
          value: parseNumber(String(data?.view_count || "0")),
        },
      ],
    },
    twitter: {
      avatar: data?.avatar || "/logo_small.png",
      sub: isDrawer
        ? [
            {
              icon: <Repeat color="#54ADEE" />,
              value: parseNumber(String(data?.retweet_count || "0")),
            },
            {
              icon: <Heart color="#E0526A" weight="fill" />,
              value: parseNumber(String(data?.like_count || "0")),
            },
            {
              icon: <ChatTeardropDots color="#1CB0A5" weight="fill" />,
              value: parseNumber(String(data?.comment_count || "0")),
            },
            {
              icon: <Eye color="#256EF6" weight="fill" />,
              value: parseNumber(String(data?.view_count || "0")),
            },
            {
              icon: <Bookmark color="#B8860B" weight="fill" />,
              value: parseNumber(String(data?.bookmark_count || "0")),
            },
          ]
        : [
            {
              icon: <Repeat color="#54ADEE" />,
              value: parseNumber(String(data?.retweet_count || "0")),
            },
            {
              icon: <Heart color="#E0526A" weight="fill" />,
              value: parseNumber(String(data?.like_count || "0")),
            },
          ],
    },
    instagram: {
      avatar: data?.avatar || "/logo_small.png",
      sub: [
        {
          icon: <ChatTeardropDots color="#1CB0A5" weight="fill" />,
          value: parseNumber(String(data?.comment_count || "0")),
        },
        {
          icon: <Heart color="#E0526A" weight="fill" />,
          value: parseNumber(String(data?.like_count || "0")),
        },
      ],
    },
    news: {
      avatar: data?.avatar || "/logo_small.png",
      sub: [
        {
          icon: <ChatTeardropDots color="#1CB0A5" weight="fill" />,
          value: parseNumber(String(data?.comment_count || "0")),
        },
        {
          icon: <Eye color="#256EF6" weight="fill" />,
          value: parseNumber(String(data?.view_count || "0")),
        },
      ],
    },
    eitaa: {
      avatar: "/logo_small.png",
      sub: [
        {
          icon: <Eye color="#256EF6" weight="fill" />,
          value: parseNumber(String(data?.view_count || "0")),
        },
      ],
    },
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const loadBookmarks = async () => {
    setIsLoading(true);
    try {
      const res = await bookmark.getBookmarks();
      const result = res?.data?.data;
      setMyBookmarksLists(result?.bookmarks);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const bookmarkHandler = (id) => {
    setBookmarkToDelete(id); // Store the ID of the bookmark to be deleted
    setIsDeletePopUpOpen(true); // Open the delete popup
  };

  const confirmDelete = async () => {
    if (!bookmarkToDelete) return; // Ensure there's a bookmark to delete
    setIsLoading(true);
    try {
      await bookmark.toggleBookmark({
        content_id: bookmarkToDelete,
        content: data,
        platform: media,
      });
      notification.success(
        "محتوای مورد نظر از لیست نشان‌شده‌ها حذف شد.",
        <CheckCircle className="text-light-success-text-rest" size={26} />
      );
      loadBookmarks(); // Refresh the bookmarks list after deletion
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsDeletePopUpOpen(false); // Close the delete popup
    setBookmarkToDelete(null); // Clear the stored bookmark ID
  };
  return (
    <div
      className="p-4 flex flex-col justify-between gap-4 min-h-40 h-full w-full [direction:rtl]"
      style={{ ...(height ? { height } : {}) }}
    >
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          {selectable && (
            <input
              type="checkbox"
              className="size-6"
              style={{ accentColor: "#343330" }}
              checked={isSelected}
              onChange={(e) => handleSelect(e.target.checked)}
            />
          )}
          {showBookMark && (
            <BookmarkSimple
              color="#6F5CD1"
              size={32}
              weight="fill"
              className="cursor-pointer"
              onClick={() => bookmarkHandler(data?.id)} // Open delete popup on click
            />
          )}
          <div className="flex gap-2 relative">
            <div
              className={"size-10 rounded-full bg-contain ml-2"}
              style={{
                backgroundImage: `url(${
                  selectMedia[media]?.avatar || selectMedia.eitaa.avatar
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center center",
                cursor: handleClickOnAvatar ? "zoom-in" : "default",
              }}
              onClick={handleClickOnAvatar}
            ></div>
            {showHeaderMenu && (
              <span
                className={
                  "absolute top-6 right-0 rounded-full overflow-hidden !w-[20px] !h-[20px]"
                }
              >
                <MediaBadge
                  media={platform || media}
                  className={"!h-[20px] !w-[20px]"}
                />
              </span>
            )}
            <div className="flex flex-col flex-1">
              <span className="font-subtitle-medium text-light-neutral-text-high">
                {truncateText(data.title) ||
                  data?.user_title ||
                  data?.agency?.name ||
                  data?.channel_title ||
                  data?.agency}
              </span>
              <span className="font-overline-medium text-light-neutral-text-medium">
                {(data?.username || data?.user_name || data?.channel_username) +
                  `${(platform || media) !== "news" ? "@" : ""}`}
              </span>
            </div>
          </div>
        </div>
        {showHeaderMenu ? (
          <SummaryCardHeaderMenu
            media={media}
            platform={platform}
            data={data}
            hasNotes={hasNotes}
            is_Pin={is_pin}
            setUpdater={setUpdater}
            isDropdownOpen={isDropdownOpen}
            is360={is360}
            isShowMore={true}
          />
        ) : (
          <MediaBadge media={media} showMediaName={showMediaName} />
        )}
      </div>
      <div>{children}</div>

      {isShowMore ? (
        <div className="flex flex-col h-12 justify-between">
          <div className="flex gap-1 font-overline-medium text-light-neutral-text-medium">
            <span>
              {data.time
                ? parseTimeToPersian(data.time)
                : data.date
                ? parseTimeToPersian(data.date)
                : ""}
            </span>
          </div>
          <div
            className={`flex gap-4 ${
              (platform || media) === "twitter" && isDrawer && "w-full"
            }`}
          >
            {selectMedia[platform || media]?.sub.map(({ icon, value }, index) =>
              (platform || media) === "twitter" && isDrawer === true ? (
                <div
                  className="flex items-center gap-3 justify-center w-full"
                  key={index}
                >
                  <div className="flex items-center gap-1">
                    <span className="font-overline-medium text-light-neutral-text-medium">
                      {value}
                    </span>
                    <div>{icon}</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1" key={index}>
                  <span className="font-overline-medium text-light-neutral-text-medium">
                    {value}
                  </span>
                  <div>{icon}</div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex gap-1 font-overline-medium text-light-neutral-text-medium">
            <span>
              {data.time
                ? parseTimeToPersian(data.time)
                : data.date
                ? parseTimeToPersian(data.date)
                : ""}
            </span>
          </div>
          <div
            className={`flex gap-4 ${
              (platform || media) === "twitter" && isDrawer && "w-full"
            }`}
          >
            {selectMedia[platform || media]?.sub.map(({ icon, value }, index) =>
              (platform || media) === "twitter" && isDrawer === true ? (
                <div
                  className="flex items-center gap-3 justify-center w-full"
                  key={index}
                >
                  <div className="flex items-center gap-1">
                    <span className="font-overline-medium text-light-neutral-text-medium">
                      {value}
                    </span>
                    <div>{icon}</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1" key={index}>
                  <span className="font-overline-medium text-light-neutral-text-medium">
                    {value}
                  </span>
                  <div>{icon}</div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      <DeletePopUp
        onClose={() => setIsDeletePopUpOpen(false)}
        isOpen={isDeletePopUpOpen}
        submitHandler={confirmDelete}
        title="آیا می‌خواهید محتوای نشان شده را حذف کنید؟"
      />
    </div>
  );
};

export default SummaryCard;

SummaryCard.propTypes = {
  media: PropTypes.oneOf(["telegram", "twitter", "instagram", "eitaa", "news"])
    .isRequired,
  data: PropTypes.object.isRequired,
};
