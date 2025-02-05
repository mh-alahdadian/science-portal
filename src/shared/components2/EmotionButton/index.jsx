import PropTypes from "prop-types";

export const EmotionButton = ({
  id,
  title,
  icon: Icon,
  isActive,
  onClick,
  className,
}) => {
  return (
    <div
      key={id}
      onClick={() => {
        onClick(id);
      }}
      className={
        `flex justify-center flex-col ${
          isActive ? "bg-light-neutral-surface-highlight" : "bg-transparent"
        } cursor-pointer h-[74px] py-[8px] px-4 rounded-[8px] [direction:rtl] ` +
        className
      }
    >
      <Icon className={"flex-1 justify-center m-auto"} size={40} />
      <span className={"flex justify-center text-body-small"}>{title}</span>
    </div>
  );
};

EmotionButton.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.any,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
