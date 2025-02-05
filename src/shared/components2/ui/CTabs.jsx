import PropTypes from "prop-types";
import { toPersianNumber } from "utils/helper";

const defaultConfig = {
  iconSize: 16,
  buttonMinWidth: 136,
};

export const CTabs = ({
  tabArray = [{ id: "1", title: "tab 1", color: "#000" }], // [{id: "uniqueId", title: "عنوان", icon: ICon, color: "#000000"}]
  activeTab = "1", // some tab id. ex: "uniqueId"
  onChange = () => {}, // onChange function
  config = defaultConfig, // Configuration object for icons and button styles
  className = "", // Additional className for custom styling
}) => {
  const mergedConfig = { ...defaultConfig, ...config };

  return (
    <ul
      className={`flex flex-row w-full align-middle py-1 font-body-small text-light-neutral-text-high text-center bg-light-neutral-surface-highlight rounded-[8px] [direction:ltr] ${className}`}
    >
      {tabArray.map(({ id, title, icon: Icon, color, count }) => (
        <li key={id} className="mx-1 flex-1">
          <div
            aria-current="page"
            className={`flex justify-center items-center cursor-pointer
                   w-full h-full px-2 py-1 rounded-[8px]
                    ${
                      activeTab === id
                        ? "bg-light-neutral-surface-card active"
                        : "bg-transparent"
                    }`}
            onClick={() => onChange(id)}
            style={{ minWidth: mergedConfig.buttonMinWidth }}
          >
            <div
              className={"flex text-center gap-1"}
              style={{ color: activeTab === id && color }}
            >
              {typeof count === "number" && (
                <span>{`(${toPersianNumber(count)})`}</span>
              )}
              <span>{title}</span>
            </div>
            {Icon && (
              <Icon
                className="inline-block h-full ml-1"
                style={{ color: activeTab === id && color }}
                size={mergedConfig.iconSize}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

CTabs.propTypes = {
  tabArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.object,
    }),
  ),
  activeTab: PropTypes.string,
  config: PropTypes.shape({
    iconSize: PropTypes.number,
    buttonMinWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onChange: PropTypes.func,
  className: PropTypes.string,
};
