import { ReactNode } from 'react';
import clsx from 'clsx';

interface PlainButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

const PlainButton = ({
  children,
  disabled = false,
  onClick,
  size = 'md',
}: PlainButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        size === 'sm' ? 'text-sm py-2 px-3' : 'text-base py-3 px-4',
        'rounded-[4px] inline-flex items-center justify-center text-center font-medium text-[#1a73e8] hover:bg-[rgb(26_115_232_/_4%)] hover:text-[#174ea6] disabled:bg-transparent disabled:text-[#3c404361]'
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PlainButton;
