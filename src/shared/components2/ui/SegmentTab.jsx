const SegmentTab = ({ segmentArray, activeTab, onChange }) => {
  return (
    <ul className="flex flex-row-reverse gap-2 font-overline-medium">
      {segmentArray.map(({ id, title }) => (
        <li
          className="px-2 py-1 text-light-neutral-text-medium bg-light-neutral-background-low rounded-md hover:cursor-pointer"
          onClick={() => onChange(id)}
          style={{
            ...(activeTab === id
              ? { color: "#000000", backgroundColor: "#E1E8EFCC " }
              : {}),
          }}
          key={id}
        >
          {title}
        </li>
      ))}
    </ul>
  );
};

export default SegmentTab;
