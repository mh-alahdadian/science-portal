import "./loading.css";
const Loading = ({ className='', style={} }) => {
  return (
    <div
      className={"w-screen h-screen flex justify-center items-center bg-light-neutral-surface-backdrop fixed z-[10000] top-0 left-0 " + className}
      style={style}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
