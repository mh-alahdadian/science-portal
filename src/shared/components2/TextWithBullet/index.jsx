import Bullet from "../ui/Bullet";

const TextWithBullet = ({ children, color }) => {
  return (
    <div className="flex gap-4">
      <Bullet color={color} />
      <div className="font-body-medium text-justify">{children}</div>
    </div>
  );
};

export default TextWithBullet;
