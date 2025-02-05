import MediaBadge from "../ui/MediaBadge";

const AlertAndFilterDetailsBadge = ({ children, media }) => {
  return (
    <div className="py-1 px-3 rounded-lg flex gap-2 bg-light-neutral-background-low border-[1px] border-light-neutral-border-low-rest">
      {media && (
        <div>
          <MediaBadge media={media} />
        </div>
      )}
      <span className="font-body-small text-light-neutral-text-high flex">
        {children}
      </span>
    </div>
  );
};

export default AlertAndFilterDetailsBadge;
