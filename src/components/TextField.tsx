import React from 'react';

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#5f6368"
          >
            <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z" />
            <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none" />
          </svg>
        </span>
      </div>
    </>
  );
};

export default TextField;
