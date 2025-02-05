import PropTypes from "prop-types";

export const FilterCard = ({ title, icon: Icon, className = "", children }) => {
  return (
    <div
      dir="ltr"
      className={`flex flex-col !p-[16px] !relative border-b` + className}
    >
      <div className={`flex w-full font-body-medium justify-end mb-4`}>
        <h3 className={`text-light-neutral-text-high font-overline-large ml-2`}>
          {title}
        </h3>
        <Icon size={20} className={`text-light-neutral-text-low ml-2`} />
      </div>
      {children}
    </div>
  );
};

FilterCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};
