import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { SpinnerGap, X } from "@phosphor-icons/react";
import debounce from "lodash.debounce";
import advanceSearch from "../../service/api/advanceSearch.js";
import { deepEqual, parseNumber } from "utils/helper.js";
import MediaBadge from "./MediaBadge.jsx";
import useSearchStore from "../../store/searchStore.js";
import { buildRequestData } from "utils/requestData.js";

const TwitterRowItem = ({ item, onSelect }) => {
  return (
    <li
      className={"dropdown-item !justify-start gap-2 cursor-pointer"}
      key={item.id}
      onClick={() => onSelect({ id: item?.id, name: item?.user_name })}
    >
      <img
        src={`https://f002.backblazeb2.com/file/all-gather-media/${item.avatar}`}
        alt={item.title}
        className="w-10 h-10 rounded-full ml-2"
      />
      <div className="flex flex-col right">
        <span className="font-body-bold-medium">{item.title}</span>
        <MediaBadge media={"twitter"} />
        <span className="font-body-small text-light-neutral-text-medium">
          @{item.user_name}
        </span>
        <span className="font-body-small">
          تعداد فالوور: {parseNumber(item?.follower_count || 0)}
        </span>
      </div>
    </li>
  );
};

const TelegramRowItem = ({ item, onSelect }) => {
  return (
    <li
      className={"dropdown-item !justify-start gap-2 cursor-pointer"}
      key={item.id}
      onClick={() => onSelect({ id: item?.id, name: item?.chat_name })}
    >
      <img
        src={`https://f002.backblazeb2.com/file/all-gather-media/${item.avatar}`}
        alt={item.title}
        className="w-10 h-10 rounded-full ml-2"
      />
      <div className="flex flex-col right">
        <span className="font-body-bold-medium">{item.title}</span>
        <MediaBadge media={"telegram"} />
        <span className="font-body-small text-light-neutral-text-medium">
          @{item.username}
        </span>
        <span className="font-body-small">
          تعداد اعضا: {parseNumber(item.member_count)}
        </span>
      </div>
    </li>
  );
};

const InstagramRowItem = ({ item, onSelect }) => {
  return (
    <li
      className={"dropdown-item !justify-start gap-2 cursor-pointer"}
      key={item.id}
      onClick={() => onSelect({ id: item?.id, name: item?.user_name })}
    >
      <img
        src={`https://f002.backblazeb2.com/file/all-gather-media/${item.avatar}`}
        alt={item.title}
        className="w-10 h-10 rounded-full ml-2"
      />
      <div className="flex flex-col right">
        <span className="font-body-bold-medium">{item.title}</span>
        <MediaBadge media={"instagram"} />
        <span className="font-body-small text-light-neutral-text-medium">
          @{item.username}
        </span>
        <span className="font-body-small">
          تعداد فالوور: {parseNumber(item.follower_count)}
        </span>
      </div>
    </li>
  );
};

const NewsRowItem = ({ item, onSelect }) => {
  return (
    <li
      className={"dropdown-item !justify-start gap-2 cursor-pointer"}
      key={item.id}
      onClick={() => onSelect({ id: item.id, name: item.full_name })}
    >
      <img
        src={item.avatar || item?.logo_image}
        alt={item.title}
        className="w-10 h-10 rounded-full ml-2"
      />
      <div className="flex flex-col right">
        <span className="font-body-bold-medium">
          {item.title || item?.full_name}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-body-small text-light-neutral-text-medium">
            {item?.source_name || item.id}@
          </span>
          <MediaBadge media={"news"} />
        </div>
      </div>
    </li>
  );
};

const EitaRowItem = ({ item, onSelect }) => {
  return (
    <li
      className={"dropdown-item !justify-start gap-2 cursor-pointer"}
      key={item.id}
      onClick={() => onSelect(item.id, item.username)}
    >
      <img
        src={item.avatar}
        alt={item.title}
        className="w-10 h-10 rounded-full ml-2"
      />
      <div className="flex flex-col right">
        <span className="font-body-bold-medium">{item.title}</span>
        <MediaBadge media={"eitaa"} />
        <span className="font-body-small text-light-neutral-text-medium">
          @{item.username}
        </span>
        <span className="font-body-small">
          تعداد اعضا: {parseNumber(item.member_count)}
        </span>
      </div>
    </li>
  );
};

export const ResourceSearchInput = ({
  id,
  size = "md",
  inset = false,
  state = "rest",
  validation = "none",
  direction = "rtl",
  innerLabel,
  title,
  placeholder,
  value,
  headingIcon,
  link,
  platform,
  linkText,
  caption,
  successMessage,
  disabled,
  className,
  onChange,
  onBlur,
  onFocus,
  field,
  inputProps,
  // platform,
  form: { errors, touched },
}) => {
  const { filters } = useSearchStore();

  // if (platform) filters.platform = platform;

  const [inputClasses, setInputClasses] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [inputValue, setInputValue] = useState(value || "");
  const [inputSuccess, setInputSuccess] = useState(successMessage || "");
  const [selectedList, setSelectedList] = useState(filters.sources || []);
  const [activeDropDown, setActiveDropdown] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prevPlatform, setPrevPlatform] = useState(filters.platform);

  const dropdownRef = useRef(null);

  const initInput = () => {};

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const search = async (query) => {
    if (query.length < 2) {
      setActiveDropdown(false);
      return;
    }

    setLoading(true);
    try {
      const filterObject = {
        ...filters,
        q: query,
      };
      const req = buildRequestData(filterObject, "search_in_source");
      const responseStinas = await advanceSearch.search(req);
      const parsedResponse = responseStinas?.data?.data?.[platform];

      if (parsedResponse) {
        setDropdownItems(parsedResponse);
        setActiveDropdown(true);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const debouncedSearch = useCallback(debounce(search, 1500), [
    filters.platform,
  ]);

  const getInputClasses = useCallback(() => {
    let baseClass = "c-input";
    let classes = baseClass;

    classes += ` ${baseClass}-${size}`;
    if (inset) classes += ` ${baseClass}-inset`;
    classes += ` ${baseClass}-${state}`;
    if (touched[field.name] && errors[field.name])
      classes += ` ${baseClass}-error`;

    classes += ` ${baseClass}-${direction}`;

    classes += ` ${className || ""}`;

    // return 'cinput cinput-sm cinput-rest cinput-ltr';
    return classes;
  }, [
    className,
    disabled,
    state,
    validation,
    size,
    inset,
    direction,
    errors,
    touched,
  ]);

  useEffect(() => {
    initInput();
  }, []);

  useEffect(() => {
    setSelectedList(filters.sources);
  }, [filters.sources]);

  useEffect(() => {
    if (filters.platform === prevPlatform) return;
    setSelectedList([]);
    setInputValue("");
    setPrevPlatform(filters.platform);
    setActiveDropdown(false);
  }, [filters.platform]);

  useEffect(() => {
    if (inputValue && inputValue !== "") setActiveDropdown(true);
    else setActiveDropdown(false);
  }, [inputValue]);

  useEffect(() => {
    setInputClasses(getInputClasses());
  }, [disabled, getInputClasses, validation, errors, touched, successMessage]);

  useEffect(() => {
    if (deepEqual(selectedList, filters.sources)) return;
    onChange([...selectedList]);
  }, [selectedList]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onItemSelect = ({ id, name }) => {
    setSelectedList((l) => {
      const userExists = l.some((item) => item.id === id);
      if (!userExists)
        return [
          ...l,
          {
            id: id,
            name: name,
          },
        ];
      return l;
    });
    setSelectedName(name);
    setInputValue("");
    setDropdownItems([]);
  };

  const onRemoveItem = (id) => {
    setSelectedList((l) => l.filter((item) => item.id !== id));
  };

  return (
    <div className={inputClasses} ref={dropdownRef}>
      <div className={"label-wrapper"}>
        {title && <label htmlFor={field.name}>{title}</label>}
        {link && <a href={link}>{linkText}</a>}
      </div>
      <div className={"input-wrapper"}>
        {headingIcon && (
          <span className="action-icon text-left">{headingIcon}</span>
        )}
        <input
          type={"text"}
          id={id}
          name={field.name}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={inputValue}
          // onKeyDown={onKeyDown}
          {...inputProps}
        />
        {innerLabel && (
          <span className={"inner-label font- text-right"}>{innerLabel}</span>
        )}
      </div>

      <div className={"hint-wrapper"}>
        {caption && <p className={"caption [direction:rtl]"}>{caption}</p>}
        {inputSuccess && <p className={`success-message`}>{inputSuccess}</p>}
        {touched[field.name] && errors[field.name] && (
          <p className={`error-message`}>{errors[field.name]}</p>
        )}
      </div>

      {activeDropDown && (
        <div className={"input-dropdown"}>
          <ul className={"dropdown-wrapper"}>
            {loading ? (
              <SpinnerGap
                className={"animate-spin text-center w-full"}
              ></SpinnerGap>
            ) : (
              <>
                {dropdownItems.length > 0 ? (
                  dropdownItems.map((item) => (
                    <>
                      {filters.platform === "twitter" && (
                        <TwitterRowItem onSelect={onItemSelect} item={item} />
                      )}
                      {filters.platform === "instagram" && (
                        <InstagramRowItem onSelect={onItemSelect} item={item} />
                      )}
                      {filters.platform === "telegram" && (
                        <TelegramRowItem onSelect={onItemSelect} item={item} />
                      )}
                      {filters.platform === "news" && (
                        <NewsRowItem onSelect={onItemSelect} item={item} />
                      )}
                      {filters.platform === "eitaa" && (
                        <EitaRowItem onSelect={onItemSelect} item={item} />
                      )}
                    </>
                  ))
                ) : (
                  <li className={"text-center justify-center"}>
                    <span
                      className={
                        "inline-flex flex-1 text-body-small font-body-bold-small"
                      }
                    >
                      موردی یافت نشد
                    </span>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      )}

      <div className={"text-right"}>
        {selectedList.map((item) => (
          <div
            key={item.id}
            className={
              "inline-flex flex-row items-center bg-light-neutral-background-low ml-2 my-1 border border-light-neutral-border-low-rest h-[30px] py-[6px] px-2 rounded-[8px] [direction:rtl]"
            }
          >
            <span className={"flex flex-1 pl-2 text-body-small"}>
              {item.name || "---"}
            </span>
            <X
              size={13}
              className={"cursor-pointer text-light-neutral-text-low "}
              onClick={() => {
                onRemoveItem(item.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ResourceSearchInput.propTypes = {
  id: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  inset: PropTypes.bool,
  state: PropTypes.oneOf(["rest", "typing", "filled", "disabled", "read-only"]),
  validation: PropTypes.oneOf(["none", "success", "error"]),
  direction: PropTypes.oneOf(["rtl", "ltr"]),
  innerLabel: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  headingIcon: PropTypes.element,
  link: PropTypes.string,
  linkText: PropTypes.string,
  caption: PropTypes.string,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  platform: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  inputProps: PropTypes.object,
};
