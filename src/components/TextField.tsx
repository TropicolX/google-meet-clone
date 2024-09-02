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
      <label className="mb-2.5 block text-base font-medium text-black sr-only">
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
          className="w-57.5 h-12 tracking-loose leading-4 font-roboto bg-transparent rounded ring-1 ring-inset ring-[#80868b] hover:ring-meet-black py-2.5 pr-4 pl-12 outline-none transition focus:ring-2 focus:ring-primary placeholder:font-normal placeholder:text-meet-gray disabled:cursor-default disabled:bg-gray-2"
        />
        <span className="absolute top-1/2 left-4 -translate-y-1/2">
          <KeyboardFilled />
        </span>
      </div>
    </>
  );
};

export default TextField;
