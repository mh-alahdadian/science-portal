import {SpinnerGap} from "@phosphor-icons/react";

const CardLoading = ({ className='', style={}, size=40 }) => {
  return (
    <div className={`w-full h-full flex justify-center items-center ${className}`} style={style}>
      <SpinnerGap size={size} className="animate-spin"/>
    </div>
  );
};

export default CardLoading;
