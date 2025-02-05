const Bullet = ({ color}) => {
  return (
    <div
      className="size-2 bg-[#D9D9D9] rounded-full mt-[6px] shrink-0"
      style={{ ...(color ? { backgroundColor: color } : {}) }}
    ></div>
  );
};

export default Bullet;
