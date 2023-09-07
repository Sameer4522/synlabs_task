import React, { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

type props = {
  children: ReactNode;
  onClose: () => void;
};

const ModalLayout: React.FC<props> = ({ children, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 z-[100] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/70"
    >
      <div
        onClick={(e) => {
          // to stop the onClose function to run when clicking on child elements
          e.stopPropagation();
        }}
        className={`relative flex h-fit w-fit flex-col items-center justify-center rounded-lg bg-white p-8`}
      >
        <div>
          <RxCross2
            size={16}
            onClick={onClose}
            className="absolute right-3 top-3 cursor-pointer stroke-1"
          />
        </div>

        <div className="flex w-full h-full flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
