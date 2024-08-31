import Image from 'next/image';

import Apps from './icons/Apps';
import Feedback from './icons/Feedback';
import Help from './icons/Help';
import IconButton from './IconButton';
import PlainButton from './PlainButton';
import Videocam from './icons/Videocam';
import Settings from './icons/Settings';
import useTime from '../hooks/useTime';

interface HeaderProps {
  navItems?: boolean;
}

const Header = ({ navItems = true }: HeaderProps) => {
  const { currentDateTime } = useTime();
  const signedIn = true;

  return (
    <header className="w-full px-4 pt-4 flex items-center justify-between bg-white">
      <div className="w-60 max-w-full">
        <a href="/#" className="flex items-center gap-2 w-full">
          <Videocam width={40} height={40} color="#1a73e8" />
          <div className="font-['Product_Sans'] text-[24px] leading-[24px] text-[#5f6368]">
            <span className="font-medium">Moogle </span>
            <span>Meet</span>
          </div>
        </a>
      </div>
      <div className="flex items-center cursor-default">
        {navItems && (
          <>
            <div className="hidden md:block mr-2 text-[18px] leading-[1.125rem] text-[#5f6368]">
              {currentDateTime}
            </div>
            <div className="hidden sm:contents">
              <IconButton icon={<Help />} />
              <IconButton icon={<Feedback />} />
              <IconButton icon={<Settings />} />
              <div className="lg:ml-5">
                <IconButton icon={<Apps />} />
              </div>
            </div>
          </>
        )}
        <div className="relative ml-2 rounded-full">
          {signedIn ? (
            <Image
              src="https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-05.jpg"
              alt="avatar"
              width={36}
              height={36}
              className="h-full w-full rounded-full object-cover object-center"
            />
          ) : (
            <PlainButton size="sm">Sign In</PlainButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
