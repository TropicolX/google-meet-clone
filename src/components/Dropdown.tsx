import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import ArrowDropdown from './icons/ArrowDropdown';

let useClickOutside = (handler: () => void) => {
  let domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let maybeHandler = (event: MouseEvent) => {
      if (!domNode.current!.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};

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
}
const Dropdown = ({
  label,
  icon = null,
  onChange = () => null,
  options,
  value,
  disabled = false,
}: DropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setDropdownOpen(false);
  }) as unknown as MutableRefObject<HTMLDivElement>;

  return (
    <div className="flex flex-wrap -mx-4">
      <div ref={domNode} className="w-full px-4 sm:w-1/2 lg:w-1/4">
        <div className="pb-8 text-center">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-[168px] h-[36px] rounded-full bg-transparent flex items-center px-2.5 text-[#5f6368] hover:text-[#202124] hover:bg-[rgba(26,115,232,.04)] transition-[background-color] duration-[15ms] ease-linear [&:hover_svg]:fill-[#202124] [&_svg]:disabled:fill-[#5f6368] text-[14px] font-medium border border-transparent hover:border-[#dadce0] disabled:border-[#dadce0] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#5f6368]"
              disabled={disabled}
            >
              {icon && (
                <span className="mr-[6px] [&_svg]:fill-[#5f6368] [&_svg]:w-[20px] [&_svg]:h-[20px]">
                  {icon}
                </span>
              )}
              <span className="max-w-[130px] truncate">{label}</span>
              <span>
                <ArrowDropdown />
              </span>
            </button>
            <div
              className={`shadow-xl absolute left-0 z-40 mt-2 w-[295px] rounded-md bg-white py-[10px] transition-all ${
                dropdownOpen
                  ? 'bottom-full opacity-100 visible'
                  : 'bottom-[110%] invisible opacity-0'
              }`}
            >
              {options?.map((option) => {
                const selected = value === option.value;
                return (
                  <div
                    key={option.value}
                    className={`option cursor-pointer select-none hover:bg-[#F5F7FD] hover:text-primary block px-5 py-2 text-base ${
                      selected ? 'text-[#1a73e8]' : ''
                    }`}
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
