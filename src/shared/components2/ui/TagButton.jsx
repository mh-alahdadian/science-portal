import PropTypes from "prop-types";
export const TagButton = ({icon: Icon, title, id, isActive=false, className, onClick}) => {
  return (
    <div
      key={id}
      onClick={() => {onClick(id)}}
      className={`inline-flex justify-center flex-row ${isActive ? 'bg-light-primary-background-tag' : 'bg-light-neutral-background-low'} cursor-pointer border border-light-neutral-border-low-rest h-[30px] py-[6px] px-2 rounded-[8px] [direction:rtl] ` + className}>
      {Icon && <Icon className={'inline-block h-full ml-1'} size={15}/>}
      <span className={'inline-block justify-center text-body-small'}>{title}</span>
    </div>
  );
};

TagButton.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  isActive: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
