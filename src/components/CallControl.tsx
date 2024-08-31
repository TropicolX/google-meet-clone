import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Exclamation from './icons/Exclamation';

interface CallControlProps {
  icon: ReactNode;
  onClick?: () => void;
  active?: boolean;
  alert?: boolean;
}

const CallControl = ({
  active = false,
  alert = false,
  icon,
  onClick,
}: CallControlProps) => {
  const alertIcon = (
    <div className="absolute top-[-5px] right-0 w-[24px] h-[24px] bg-[#fa7b17] rounded-full flex items-center justify-center">
      <Exclamation />
    </div>
  );

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

export default CallControl;
