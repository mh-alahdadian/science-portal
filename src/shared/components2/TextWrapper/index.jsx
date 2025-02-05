import DOMPurify from "dompurify";

const TextWrapper = ({ length = 50, children, media }) => {
  const TextWithoutHtml = DOMPurify.sanitize(children, {
    USE_PROFILES: { html: false },
  });

  const TextWithoutClass = DOMPurify.sanitize(children, {
    FORBID_ATTR: ["class"],
  });

  // const [showMoreText, setShowMoreText] = useState(false);
  // if (showMoreText) {
  // return (
  //   <div className="font-body-medium text-light-neutral-text-high">
  //     <div
  //       className="text-justify"
  //       style={{ wordBreak: "break-word" }}
  //       dangerouslySetInnerHTML={{
  //         __html: TextWithoutClass,
  //       }}
  //     />
  //   </div>
  // );
  // }

  if (children?.length > length) {
    return (
      <div className="font-body-medium text-light-neutral-text-high">
        <div className="flex flex-col gap-2">
          {/* <div
            className="text-justify"
            style={{ wordBreak: "break-word" }}
            dangerouslySetInnerHTML={{
              __html: TextWithoutHtml.slice(0, length) + "...",
            }}
          /> */}
          <div className="font-body-medium text-light-neutral-text-high">
            <div
              className="text-justify"
              style={{ wordBreak: "break-word" }}
              dangerouslySetInnerHTML={{
                __html: TextWithoutClass,
              }}
            />
          </div>
          {/* <span
            className="text-light-inform-text-rest cursor-pointer self-start"
            onClick={() => setShowMoreText(true)}
          >
            نمایش بیشتر . . .
          </span> */}
        </div>
      </div>
    );
  }

  return (
    <div className="font-body-medium text-light-neutral-text-high">
      <div
        className="text-justify"
        style={{ wordBreak: "break-word" }}
        dangerouslySetInnerHTML={{
          __html: TextWithoutClass,
        }}
      />
    </div>
  );
};

export default TextWrapper;
