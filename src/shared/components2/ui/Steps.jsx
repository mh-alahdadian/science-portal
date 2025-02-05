import { toPersianNumber } from "utils/helper";

const Steps = ({ step = 1, stepCounts = 4, texts = [] }) => {
  const steps = [];
  for (let i = 0; i < stepCounts; i++) {
    steps.push(i + 1);
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-[2px]">
        {steps.map((x, i, a) => (
          <>
            <div
              className="size-6 border border-light-primary-border-rest flex items-center justify-center rounded-lg font-body-large shrink-0"
              style={{
                borderColor:
                  step == x ? "#4D36BF" : step > x ? "#19A399" : "#9198AD",
                color: step == x ? "black" : step > x ? "white" : "#00000080",
                backgroundColor: step > x ? "#19A399" : "white",
              }}
            >
              {toPersianNumber(x)}
            </div>
            {i != a.length - 1 && (
              <div
                className="w-full border"
                style={{
                  borderStyle: step > x ? "solid" : "dashed",
                  borderColor: step > x ? "#19A399" : "#9198AD",
                }}
              ></div>
            )}
          </>
        ))}
      </div>
      {!!texts.length && (
        <div className="flex justify-between font-body-medium">
          {texts.map((x, i) => (
            <span
              style={{
                color: step >= i + 1 ? "black" : "#00000080",
              }}
            >
              {x}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Steps;
