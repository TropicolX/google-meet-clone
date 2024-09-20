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
        rounding === 'sm' && 'rounded',
        rounding === 'md' && 'rounded-md',
        rounding === 'lg' && 'rounded-full',
        size === 'sm'
          ? 'h-10 text-sm px-3 tracking-normal'
          : 'h-12 text-base pr-4 pl-3',
        variant === 'primary' && 'bg-primary hover:bg-hover-primary',
        variant === 'secondary' && 'bg-meet-blue hover:bg-[#0a4ec4]',
        'inline-flex items-center justify-center text-center font-medium tracking-looser text-white hover:shadow transition-[border_.28s_cubic-bezier(.4,0,.2,1),box-shadow_.28s_cubic-bezier(.4,0,.2,1)] active:bg-deep-blue active:border-deep-blue select-none'
      )}
    >
      <span className="flex item-center justify-center mr-2">{icon}</span>
      {children}
    </button>
  );
};

export default ButtonWithIcon;
