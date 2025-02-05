const Subtitle = ({ subtitle, children }) => {
  return (
    <div className="flex justify-between">
      <p className="font-body-medium text-light-neutral-text-medium">
        {subtitle}
      </p>
      {children}
    </div>
  );
};

export default Subtitle;
