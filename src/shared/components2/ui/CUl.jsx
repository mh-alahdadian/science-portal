export const CUl = ({ listArray = [], className }) => {
  return (
    <ul className={`list-none pl-6 ${className}`}>
      {listArray.map((content) => (
        <li className="flex relative pr-6 mb-2">
          {content}
          <span className=" absolute w-[8px] h-[8px] right-0 bg-light-neutral-text-low rounded-full m-[6px]"></span>
        </li>
      ))}
    </ul>
  );
};
