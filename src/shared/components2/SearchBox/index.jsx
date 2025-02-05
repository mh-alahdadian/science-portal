import { Card } from "../ui/Card.jsx";
import { CButton } from "../ui/CButton.jsx";
import {
  InstagramLogo,
  MagnifyingGlass,
  Rss,
  Sliders,
  TelegramLogo,
  XLogo,
} from "@phosphor-icons/react";
import { CInput } from "../ui/CInput.jsx";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { CTabs } from "../ui/CTabs.jsx";
import CustomSearchDrawer from "../CustomSearchDrawer/index.jsx";
import { useScrollPosition } from "hooks/useScrollPosition.jsx";
import useSearchStore from "store/searchStore.js";
import PLATFORMS from "constants/platforms.js";
import advanceSearch from "service/api/advanceSearch";
import { buildRequestData } from "utils/requestData.js";

export const SearchBox = ({ onSubmit }) => {
  const { filters, setFilters, query, setQuery, saveState, searchBoxConfig } =
    useSearchStore();
  const [showAdvancedSearchDrawer, setShowAdvancedSearchDrawer] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [q, setQ] = useState(query);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchedListData, setSearchedListData] = useState([]);
  const ref = useRef(null);
  const tabArray = [
    { id: PLATFORMS.TWITTER, title: "ایکس", icon: XLogo, color: "#000000" },
    {
      id: PLATFORMS.TELEGRAM,
      title: "تلگرام",
      icon: TelegramLogo,
      color: "#0084C7",
    },
    {
      id: PLATFORMS.INSTAGRAM,
      title: "اینستاگرام",
      icon: InstagramLogo,
      color: "#E64787",
    },
    { id: PLATFORMS.NEWS, title: "سایت‌ خبری", icon: Rss, color: "#ECA213" },
  ];

  const onPlatformChange = (selectedPlatform) => {
    setFilters({ platform: selectedPlatform });
    saveState();
  };

  const { isScrolled } = useScrollPosition();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    if (searchBoxConfig.disableScroll) {
      setSticky(false);
    } else {
      setSticky(isScrolled);
    }
  }, [searchBoxConfig.disableScroll, isScrolled]);

  const handleSubmit = async () => {
    if (
      isSubmitting ||
      searchBoxConfig.disableButton ||
      searchBoxConfig.readOnly
    )
      return;
    if (!q || q.length < 1) return;

    setIsSubmitting(true);
    setQuery(q);
    saveState();
    await onSubmit(q);
    setIsSubmitting(false);
    setShowSuggestions(false);
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      await handleSubmit();
    }
  };

  const handleCustomSearchSubmit = async () => {
    setShowAdvancedSearchDrawer(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQ(value);
    setShowSuggestions(value.trim().length >= 3);
  };

  const setSuggestedQueryHandler = (keyword) => {
    setQuery(keyword);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (!searchBoxConfig.updateQueryOnType) setQ(query);
  }, [query]);

  useEffect(() => {
    if (searchBoxConfig.updateQueryOnType) setQuery(q);
    fetchSearchedData();
  }, [q]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!setFilters || !setQuery) return null;
  const fetchSearchedData = async () => {
    try {
      if (q?.trim()?.length >= 3) {
        const { data } = await advanceSearch.search(
          buildRequestData(
            {
              date: filters.date,
              q: q,
              platform: "all",
            },
            "search_suggest",
          ),
        );
        setSearchedListData(data?.data?.suggest || []);
      }
    } catch (error) {
      console.log(error);
      setSearchedListData([]);
    }
  };

  return (
    <div
      ref={ref}
      className={
        sticky && !searchBoxConfig.disableScroll
          ? "p-0 sticky top-[59px] z-50 [direction:ltr]"
          : "px-6 mb-3 [direction:ltr]"
      }
    >
      <Card
        className={
          sticky && !searchBoxConfig.disableScroll
            ? "!bg-light-neutral-surface-low !rounded-[0px] !shadow-none !drop-shadow-sm !py-3"
            : ""
        }
      >
        <div className={"flex flex-row w-full justify-between divide-x"}>
          {!searchBoxConfig.disablePlatform && (
            <div className={"flex flex-row first:pr-2"}>
              <div className={"w-[460px] flex flex-start"}>
                <CTabs
                  tabArray={tabArray}
                  activeTab={filters.platform}
                  onChange={onPlatformChange}
                  config={{ buttonMinWidth: 50 }}
                />
              </div>
            </div>
          )}
          <div className={"flex-1 last:pl-2 relative"}>
            <div
              className={
                "flex flex-row font-body-medium gap-[16px] mx-auto w-full h-full overflow-hidden"
              }
            >
              {!(searchBoxConfig.readOnly || searchBoxConfig.disableButton) && (
                <CButton
                  type={"submit"}
                  size={sticky && !searchBoxConfig.disableScroll ? "md" : "lg"}
                  disabled={isSubmitting}
                  className={"[direction:rtl] [width:150px!important]"}
                  onClick={handleSubmit}
                >
                  جست‌و‌جو
                </CButton>
              )}
              <CInput
                id={"q"}
                name={"q"}
                inset={true}
                headingIcon={<MagnifyingGlass />}
                size={sticky && !searchBoxConfig.disableScroll ? "md" : "lg"}
                validation={"none"}
                direction={"rtl"}
                placeholder={"کلمه مورد نظر را بنویسید"}
                className={"flex-1 !mb-0"}
                value={q}
                readOnly={searchBoxConfig.readOnly}
                onChange={handleInputChange}
                inputProps={{ onKeyDown: handleSearch }}
                customAction={async () => {
                  await handleSubmit();
                  setShowAdvancedSearchDrawer(true);
                }}
                customActionText={
                  !searchBoxConfig.readOnly ? <Sliders size={22} /> : null
                }
              />
            </div>
            {showSuggestions && (
              <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-full mt-2 p-3 z-50">
                {searchedListData.length ? (
                  searchedListData?.slice(0, 6)?.map((item) => (
                    <p
                      key={item}
                      onClick={() => setSuggestedQueryHandler(item)}
                      className="text-end cursor-pointer rounded transition p-2 hover:bg-light-neutral-surface-highlight"
                    >
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="text-center">!هیچ محتوایی یافت نشد</p>
                )}
              </div>
            )}
            <div className={!showAdvancedSearchDrawer ? "hidden" : "block"}>
              <CustomSearchDrawer
                setShowMore={setShowAdvancedSearchDrawer}
                onSubmit={handleCustomSearchSubmit}
                inputQuery={query}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
SearchBox.propTypes = {
  onSubmit: PropTypes.func,
  disableScroll: PropTypes.bool,
  disablePlatform: PropTypes.bool,
  readOnly: PropTypes.bool,
};
