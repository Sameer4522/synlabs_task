type props = {
  onClick: () => void;
  text: string;
};

const SecondaryBtn: React.FC<props> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 md:px-6 text-black drop-shadow-md shadow-md text-base md:text-xl font-semibold py-3 bg-slate-100 rounded-[5px]"
    >
      {text}
    </button>
  );
};

export default SecondaryBtn;
