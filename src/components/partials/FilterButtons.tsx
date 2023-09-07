type props = {
  icon: JSX.Element;
  text: string;
  onClick?: () => void;
};

const FilterButtons: React.FC<props> = ({ icon, text, onClick }) => {
  return (
    <button
      className="bg-white text-[15px] text-gray-500 hover:scale-[1.01] transition duration-150 font-semibold py-2 px-4 flex items-center gap-1"
      onClick={onClick}
    >
      <span className="hidden lg:block">{icon}</span> {text}
    </button>
  );
};

export default FilterButtons;
