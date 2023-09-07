import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-[1000] flex h-screen w-full items-center justify-center bg-black bg-opacity-80">
      <Oval
        height={50}
        width={50}
        color="#376DB6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#376DB650"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  );
};

export default Loading;
