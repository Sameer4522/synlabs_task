type props = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
};

const PrimaryBtn: React.FC<props> = ({ onClick, text, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 md:px-6 disabled:bg-gray-500 disabled:cursor-not-allowed text-white drop-shadow-md shadow-md text-base md:text-xl font-semibold py-3 bg-primary rounded-[5px]"
    >
      {text}
    </button>
  );
};

export default PrimaryBtn;
