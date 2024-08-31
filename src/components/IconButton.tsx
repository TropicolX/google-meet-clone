import { ReactNode } from 'react';
import clsx from 'clsx';

import Exclamation from './icons/Exclamation';

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  active?: boolean;
  variant?: 'primary' | 'secondary';
  alert?: boolean;
}

const IconButton = ({
  active = false,
  alert = false,
  icon,
  onClick,
  variant = 'primary',
}: IconButtonProps) => {
  const alertIcon = (
    <div className="absolute top-[-5px] right-0 w-[24px] h-[24px] bg-[#fa7b17] rounded-full flex items-center justify-center">
      <Exclamation />
    </div>
  );

  if (variant === 'primary')
    return (
      <button
        onClick={onClick}
        className="relative h-[36px] w-[36px] mx-2.5 rounded-full inline-flex items-center justify-center text-center text-base font-medium hover:bg-[#f6f6f6] hover:text-[#174ea6] disabled:bg-transparent disabled:text-[#3c404361] [&_svg]:fill-[#5f6368]"
      >
        {icon}
        {alert && alertIcon}
      </button>
    );
  else
    return (
      <button
        onClick={onClick}
        style={{
          WebkitMaskImage: 'none',
        }}
        className={clsx(
          'relative h-[56px] w-[56px] rounded-full inline-flex items-center justify-center text-center text-base font-medium  border border-solid transition-all ease-linear duration-[250ms] hover:transition-none hover:shadow-[0_1px_3px_0_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)] disabled:bg-transparent disabled:text-[#3c404361] [&_svg]:fill-[white]',
          active
            ? 'bg-[#ea4335] border-[#ea4335] hover:bg-[#ea4335] hover:opacity-90 transition-none'
            : 'hover:bg-[rgba(255,255,255,.4)] border-[white]'
        )}
      >
        {icon}
        {alert && alertIcon}
      </button>
    );
};

export default IconButton;
