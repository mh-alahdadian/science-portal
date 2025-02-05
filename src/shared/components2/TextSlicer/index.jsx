import DOMPurify from "dompurify";

const TextSlicer = ({ children, length = 150 }) => {
  if (typeof children === "string") {
    const sanitizedText = DOMPurify.sanitize(children, {
      USE_PROFILES: { html: false },
    });

    return (
      <div className="font-body-medium text-light-neutral-text-high min-h-4 text-justify">
        <div
          className="text-justify"
          style={{ wordBreak: "break-word" }}
          dangerouslySetInnerHTML={{
            __html:
              sanitizedText.length > length
                ? sanitizedText.slice(0, length) + "..."
                : sanitizedText,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="font-body-medium text-light-neutral-text-high min-h-4 text-justify"
      style={{ wordBreak: "break-word" }}
    >
      {children}
    </div>
  );
};

export default TextSlicer;
