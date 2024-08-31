import React from 'react';

import KeyboardFilled from './icons/KeyboardFilled';

export interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: React.ReactNode;
  placeholder: string;
}

const TextField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}: TextFieldProps) => {
  return (
    <>
      <label className="mb-[10px] block text-base font-medium text-black sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="false"
          className="w-[231px] h-[48px] tracking-[.00625rem] leading-4 font-[Roboto,_Arial,_sans-serif] bg-transparent rounded-[4px] ring-1 ring-inset ring-[#80868b] hover:ring-[#202124] py-[10px] pr-4 pl-12 outline-none transition focus:ring-[#1a73e8] focus:ring-2 placeholder:font-normal placeholder:text-[#5f6367] disabled:cursor-default disabled:bg-gray-2"
        />
        <span className="absolute top-1/2 left-4 -translate-y-1/2">
          <KeyboardFilled />
        </span>
      </div>
    </>
  );
};

export default TextField;
