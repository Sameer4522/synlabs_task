import React from "react";
import ModalLayout from "../partials/ModalLayout";
import PrimaryBtn from "../partials/PrimaryBtn";
import SecondaryBtn from "../partials/SecondaryBtn";

type props = {
  onClose: any;
  onConfirm: any;
  text?: any;
};

const ConfirmModal: React.FC<props> = ({ onClose, onConfirm, text }) => {
  return (
    <ModalLayout onClose={onClose}>
      <div className="flex h-full w-fit flex-col items-center justify-center">
        <p className="text-base md:text-xl font-medium text-center flex w-[12rem] md:w-fit flex-col gap-y-1 items-center justify-center">
          Are you sure you want to remove?
          <span className=" font-bold ">{text ? text : ""}</span>
        </p>

        <div className="mt-8 flex w-full items-center justify-center gap-6">
          <SecondaryBtn onClick={onClose} text="Cancel" />

          <PrimaryBtn onClick={onConfirm} text="Confirm" />
        </div>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
