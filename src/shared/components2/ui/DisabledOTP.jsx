const DisabledOTP = () => {
  const boxes = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-evenly mt-3 mb-6">
      {boxes.map((box) => (
        <div
          key={box}
          className="w-12 h-12 rounded-lg gap-2 bg-light-neutral-background-disable"
        ></div>
      ))}
    </div>
  );
};

export default DisabledOTP;
