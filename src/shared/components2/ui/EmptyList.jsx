import notFound from "assets/images/notFound.png";

const EmptyList = ({ title, description }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <img src={notFound} alt="notFound" />
        <div className="flex flex-col text-center mt-10 gap-2">
          <p className="font-body-large">{title}</p>
          <p className="font-body-medium text-[#737373]">{description}</p>
        </div>
      </div>
    </>
  );
};

export default EmptyList;
