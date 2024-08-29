import { ReactNode } from 'react';

interface ButtonWithIconProps {
  children: ReactNode;
  icon: JSX.Element;
  onClick?: () => void;
}

const ButtonWithIcon = ({ icon, children, onClick }: ButtonWithIconProps) => {
  return (
    <button
      onClick={onClick}
      className="h-[3rem] bg-[#1a73e8] hover:bg-[#1a6dde] rounded-[4px] inline-flex items-center justify-center pr-4 pl-3 text-center text-base font-medium tracking-[.0421rem] text-white hover:shadow-[0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)] transition-[border_.28s_cubic-bezier(.4,0,.2,1),box-shadow_.28s_cubic-bezier(.4,0,.2,1)] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]"
    >
      <span className="mr-[8px]">{icon}</span>
      {children}
    </button>
  );
};

export default ButtonWithIcon;
