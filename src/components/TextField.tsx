import React from 'react';
import clsx from 'clsx';

export interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: React.ReactNode;
  placeholder: string;
  icon?: React.ReactNode;
}

const TextField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
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
          className={clsx(
            'w-57.5 h-12 tracking-loose leading-4 font-roboto bg-transparent rounded ring-1 ring-inset ring-[#80868b] hover:ring-meet-black py-2.5 pr-4 outline-none transition focus:ring-2 focus:ring-primary placeholder:font-normal placeholder:text-meet-gray disabled:cursor-default disabled:bg-gray-2',
            icon ? 'pl-12' : 'pl-4',
            icon ? 'w-57.5' : 'w-[18rem]'
          )}
          maxLength={60}
        />
        {icon && (
          <span className="absolute top-1/2 left-4 -translate-y-1/2">
            {icon}
          </span>
        )}
      </div>
    </>
  );
};

export default TextField;
