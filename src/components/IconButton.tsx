import { ReactNode } from 'react';
import clsx from 'clsx';

import Exclamation from './icons/Exclamation';

export interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  active?: boolean;
  variant?: 'primary' | 'secondary';
  alert?: boolean;
  title?: string;
  className?: string;
}

const IconButton = ({
  active = false,
  alert = false,
  icon,
  onClick,
  variant = 'primary',
  title,
  className,
}: IconButtonProps) => {
  const alertIcon = (
    <div className="absolute -top-[5px] right-0 w-6 h-6 bg-meet-orange rounded-full flex items-center justify-center">
      <Exclamation />
    </div>
  );

  if (variant === 'primary')
    return (
      <button
        onClick={onClick}
        title={title}
        className={clsx(
          'relative h-9 w-9 rounded-full inline-flex items-center justify-center text-center text-base font-medium hover:bg-[#f6f6f6] disabled:bg-transparent disabled:text-[#3c404361] [&_svg]:fill-meet-gray',
          className
        )}
      >
        {icon}
        {alert && alertIcon}
      </button>
    );
  else
    return (
      <button
        onClick={onClick}
        title={title}
        style={{
          WebkitMaskImage: 'none',
        }}
        className={clsx(
          'relative h-14 w-14 rounded-full inline-flex items-center justify-center text-center text-base font-medium border border-solid transition-all ease-linear duration-250 hover:transition-none disabled:bg-transparent disabled:text-[#3c404361]',
          active
            ? 'bg-meet-red border-meet-red hover:bg-hover-red hover:border-hover-red transition-none'
            : 'hover:bg-[rgba(255,255,255,.4)] border-white',
          className
        )}
      >
        {icon}
        {alert && alertIcon}
      </button>
    );
};

export default IconButton;
