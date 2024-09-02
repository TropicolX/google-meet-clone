import { ReactNode } from 'react';
import clsx from 'clsx';

interface PlainButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const PlainButton = ({
  children,
  disabled = false,
  onClick,
  size = 'md',
  className,
}: PlainButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        size === 'sm' ? 'h-9 text-sm py-2 px-3' : 'text-base py-3 px-4',
        'rounded inline-flex items-center justify-center text-center font-medium text-primary hover:bg-[rgb(26_115_232_/_4%)] hover:text-[#174ea6] disabled:bg-transparent disabled:text-[#3c404361]',
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PlainButton;
