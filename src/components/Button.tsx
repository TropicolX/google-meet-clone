import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md';
  rounding?: 'sm' | 'lg';
  className?: string;
}

const Button = ({
  children,
  onClick,
  size = 'md',
  rounding = 'sm',
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        size === 'sm' ? 'h-9 text-sm' : 'h-14 text-base',
        rounding === 'sm' ? 'rounded' : 'rounded-full',
        'px-6 bg-primary hover:bg-hover-primary inline-flex items-center justify-center text-center font-medium tracking-looser text-white hover:shadow transition-[border_.28s_cubic-bezier(.4,0,.2,1),box-shadow_.28s_cubic-bezier(.4,0,.2,1)] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-deep-blue active:border-deep-blue',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
