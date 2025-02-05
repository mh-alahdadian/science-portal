import Divider from "../ui/Divider";

const Title = ({ children }) => {
  return (
    <div className="flex items-center gap-[10px]">
      {children}
      <Divider />
    </div>
  );
};

export default Title;
