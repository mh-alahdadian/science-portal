import { forwardRef } from "react";

export const Card = forwardRef(
  ({ className = "", title, onClick = undefined, children }, ref) => {
    return (
      <div
        onClick={onClick}
        ref={ref}
        className={
          "flex w-full font-body-medium bg-light-neutral-surface-card rounded-[8px] px-4 py-6 shadow-[0_2px_20px_0_rgba(0,0,0,0.05)] " +
          className
        }
      >
        {!!title && (
          <div className={"flex w-full justify-end font-body-medium mb-4"}>
            <h3 className={"text-light-neutral-text-high font-overline-large"}>
              {title}
            </h3>
          </div>
        )}
        {children}
      </div>
    );
  }
);
