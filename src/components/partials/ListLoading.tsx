import { RotatingLines } from "react-loader-spinner";

const ListLoading = () => {
  return (
    <div className="flex items-center justify-center pt-6 min-w-full gap-2">
      <RotatingLines
        strokeColor="#289ae7"
        strokeWidth="6"
        animationDuration="0.75"
        width="25"
        visible={true}
      />

      <p className="font-semibold">Loading...</p>
    </div>
  );
};

export default ListLoading;
