import { toPersianNumber } from "utils/helper";

const StatusFrame = ({ title, count, icon: Icon, variant, color }) => {
  return (
    <>
      <div className="bg-light-neutral-surface-card rounded-md w-[255.33px] h-[132px] overflow-hidden relative">
        <div className="p-3">
          <span className="font-body-small text-light-neutral-text-medium">
            {title}
          </span>
          <p
            className={`font-title-large text-light-${variant}-text-rest`}
            style={{
              color,
              fontWeight: 600,
            }}
          >
            {toPersianNumber(count.toLocaleString())}
          </p>
        </div>
        <div className="flex justify-end  absolute -left-4 -bottom-7">
          <Icon className="text-[#D9D9D9]" size={82} />
        </div>
      </div>
    </>
  );
};

export default StatusFrame;
