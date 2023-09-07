import React, { ChangeEvent } from "react";

type props = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  defaultValue?: string;
  error?: string;
  maxLength?: number;
  disabled?: boolean;
};

const InputField: React.FC<props> = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  maxLength,
  disabled,
  defaultValue,
}) => {
  return (
    <div className={`h-full w-full`}>
      <label
        className={`mb-1 flex items-center justify-start gap-1 text-base font-semibold`}
      >
        {label}
      </label>

      <div className="relative flex flex-col w-full">
        <input
          type={type}
          id={label}
          name={name}
          maxLength={maxLength}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          className={` w-full rounded-lg border border-[#000]/50 font-medium
           px-3 py-[6px] shadow-sm transition duration-200 autofill:shadow-[inset_0_0_0px_1000px_#fff] focus:border-[#000]/30  focus:outline-none ${
             type === "number" &&
             "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
           }`}
        />

        {error && (
          <p className={`mt-1 text-sm font-semibold text-red-600 `}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default InputField;
