import clsx from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md';
  rounding?: 'sm' | 'lg';
}

const Button = ({
  children,
  onClick,
  size = 'md',
  rounding = 'sm',
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        size === 'sm' ? 'h-[48px]' : 'h-[55px]',
        rounding === 'sm' ? 'rounded-[4px]' : 'rounded-full',
        'px-6 bg-[#1a73e8] hover:bg-[#1a6dde] inline-flex items-center justify-center text-center text-base font-medium tracking-[.0107142857rem] text-white hover:shadow-[0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)] transition-[border_.28s_cubic-bezier(.4,0,.2,1),box-shadow_.28s_cubic-bezier(.4,0,.2,1)] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
