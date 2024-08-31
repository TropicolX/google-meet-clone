import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonWithIconProps {
  children: ReactNode;
  icon: JSX.Element;
  onClick?: () => void;
  rounding?: 'sm' | 'md' | 'lg';
  size?: 'sm' | 'md';
  variant?: 'primary' | 'secondary';
}

const ButtonWithIcon = ({
  icon,
  children,
  onClick,
  rounding = 'sm',
  size = 'md',
  variant = 'primary',
}: ButtonWithIconProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        rounding === 'sm' && 'rounded-[4px]',
        rounding === 'md' && 'rounded-md',
        rounding === 'lg' && 'rounded-full',
        size === 'sm'
          ? 'h-[40px] text-sm px-3 tracking-normal'
          : 'h-[3rem] text-base pr-4 pl-3',
        variant === 'primary' && 'bg-[#1a73e8] hover:bg-[#1a6dde]',
        variant === 'secondary' && 'bg-[#0b57d0] hover:bg-[#0a4ec4]',
        'inline-flex items-center justify-center text-center font-medium tracking-[.0421rem] text-white hover:shadow-[0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)] transition-[border_.28s_cubic-bezier(.4,0,.2,1),box-shadow_.28s_cubic-bezier(.4,0,.2,1)] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'
      )}
    >
      <span className="flex item-center justify-center mr-[8px]">{icon}</span>
      {children}
    </button>
  );
};

export default ButtonWithIcon;
