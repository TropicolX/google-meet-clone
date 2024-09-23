import { MutableRefObject, useState } from 'react';
import clsx from 'clsx';

import ExpandLess from './icons/ExpandLess';
import ExpandMore from './icons/ExpandMore';
import Settings from './icons/Settings';
import useClickOutside from '../hooks/useClickOutside';

interface ToggleButtonContainerProps {
  children: React.ReactNode;
  deviceSelectors: React.ReactNode;
  icons?: React.ReactNode;
}

const ToggleButtonContainer = ({
  children,
  deviceSelectors,
  icons,
}: ToggleButtonContainerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useClickOutside(() => {
    setIsOpen(false);
  }, true) as MutableRefObject<HTMLDivElement>;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center h-10 bg-meet-dark-gray rounded-full">
      <div
        className={clsx(
          isOpen ? 'block' : 'hidden',
          'z-3 absolute left-0 bottom-13 h-14 w-[30.25rem] flex items-center justify-between p-2.5 bg-container-gray rounded-full shadow-[0_2px_2px_0_rgba(0,0,0,.14),0_3px_1px_-2px_rgba(0,0,0,.12),0_1px_5px_0_rgba(0,0,0,.2)]'
        )}
      >
        <div className="flex self-start items-start gap-2.5">
          {deviceSelectors}
        </div>
        <div className="flex items-center gap-0.5 [&>div]:w-9 [&>div]:h-9 [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:px-1 [&>div]:py-1.5 [&>div]:rounded-full [&>div]:cursor-pointer [&>div:hover]:bg-[#333]">
          {icons}
          <div title="Settings">
            <Settings width={20} height={20} color="white" />
          </div>
        </div>
      </div>
      <div
        ref={buttonRef}
        onClick={toggleMenu}
        title="Audio settings"
        className="hidden h-full w-6.5 sm:flex items-center justify-center cursor-pointer"
      >
        <div className="h-6 w-6 flex justify-center items-center [&>svg]:ml-[3px]">
          {isOpen ? (
            <ExpandMore width={18} height={18} color="var(--icon-blue)" />
          ) : (
            <ExpandLess width={18} height={18} />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ToggleButtonContainer;
