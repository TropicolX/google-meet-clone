import clsx from 'clsx';
import React, { forwardRef, ReactNode } from 'react';

interface PopupProps {
  className?: string;
  children: ReactNode;
  height?: number;
  title: ReactNode;
  onClose?: () => void;
  open?: boolean;
}

const Popup = forwardRef<HTMLDivElement | null, PopupProps>(function Popup(
  { className, children, height = 305, title, onClose, open = false },
  ref = null
) {
  const closePopup = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={clsx(
        `h-[${height}px]`,
        'z-[1] bg-white absolute top-auto bottom-0 left-[32px] max-w-[22.5rem] w-[clamp(280px,_22.5rem)] animate-popup translate-y-[-90px] rounded-lg shadow-[0_1px_2px_0_rgba(60,_64,_67,_.3),_0_2px_6px_2px_rgba(60,_64,_67,_.15)]',
        className
      )}
    >
      <div className="flex items-center text-[#202124] p-[12px_12px_0px_24px]">
        <div className="text-[1.125rem] leading-[1.5rem] grow my-[15px] tracking-normal">
          {title}
        </div>
        <button onClick={closePopup} className="bg-transparent outline-none">
          <div className="w-[48px] h-[48px] p-3">
            <i
              className="material-symbols-outlined text-[#202124]"
              aria-hidden="true"
            >
              close
            </i>
          </div>
        </button>
      </div>
      {children}
    </div>
  );
});

export default Popup;
