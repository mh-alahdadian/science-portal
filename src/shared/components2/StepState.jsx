import clsx from "clsx";

const StepState = ({ title, state }) => {
  const stepStateClassName = clsx("font-body-small rounded-[4px] px-1", {
    "text-light-success-text-rest bg-light-success-background-highlight":
      state === "created",
    "text-light-inform-text-rest bg-light-inform-background-highlight":
      state === "draft",
    "text-light-warning-text-rest bg-light-warning-background-highlight":
      state === "in_progress",
  });
  return <div className={stepStateClassName}>{title}</div>;
};

export default StepState;
