import { MutableRefObject, ReactNode, useState } from 'react';
import clsx from 'clsx';

import ArrowDropdown from './icons/ArrowDropdown';
import useClickOutside from '../hooks/useClickOutside';

interface DropdownProps {
  icon?: ReactNode;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  options: {
    label: string;
    value: string;
    onClick?: () => void;
  }[];
  disabled?: boolean;
  className?: string;
  dark?: boolean;
}
const Dropdown = ({
  label,
  icon = null,
  onChange = () => null,
  options,
  value,
  disabled = false,
  className,
  dark = false,
}: DropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const domNode = useClickOutside(() => {
    setDropdownOpen(false);
  }) as MutableRefObject<HTMLDivElement>;

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-wrap -mx-4 select-none">
      <div ref={domNode} className="w-full px-4 sm:w-1/2 lg:w-1/4">
        <div className="pb-8 text-center">
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className={clsx(
                'w-42 h-9 rounded-full text-sm font-medium flex items-center px-2.5 transition-colors duration-15 ease-linear [&_svg]:disabled:fill-meet-gray border disabled:border-hairline-gray disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-meet-gray',
                dark
                  ? 'text-white [&_svg]:fill-icon-blue border-meet-gray hover:border-meet-gray hover:bg-[#303134] hover:text-white [&:hover_svg]:fill-icon-hover-blue [&>div]:bg-[#303134]'
                  : 'bg-transparent text-meet-gray hover:text-meet-black hover:bg-[rgba(26,115,232,.04)] [&:hover_svg]:fill-meet-black border-transparent hover:border-hairline-gray',
                className
              )}
              disabled={disabled}
            >
              {icon && <span className="mr-2">{icon}</span>}
              <span className="text-start grow max-w-32.5 sm:max-w-full truncate">
                {label}
              </span>
              <span>
                <ArrowDropdown />
              </span>
            </button>
            <div
              className={clsx(
                'absolute left-0 z-40 mt-2 w-[18.4375rem] rounded-md py-2.5 transition-all',
                dropdownOpen ? 'opacity-100 visible' : 'invisible opacity-0',
                dark
                  ? 'bg-[#303134] rounded-xl bottom-[calc(100%+10px)] shadow-dark'
                  : 'bg-white shadow-xl bottom-full',
                className
              )}
            >
              {options?.map((option) => {
                const selected = value === option.value;
                return (
                  <div
                    key={option.value}
                    className={clsx(
                      'option cursor-pointer select-none block px-5 py-2 text-base',
                      selected && (dark ? 'text-icon-blue' : 'text-primary'),
                      dark
                        ? 'hover:bg-[#37383b]'
                        : 'hover:bg-[#F5F7FD] hover:text-primary'
                    )}
                    onClick={() => {
                      onChange(option.value);
                      setDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
