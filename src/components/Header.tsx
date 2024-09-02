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
  const email = 'jacobsbusayo@gmail.com';

  const switchAccount = () => {
    console.log('Switch account');
  };

  return (
    <header className="w-full px-4 pt-4 flex items-center justify-between bg-white">
      <div className="w-60 max-w-full">
        <a href="/#" className="flex items-center gap-2 w-full">
          <Videocam width={40} height={40} color="var(--primary)" />
          <div className="font-product-sans text-2xl leading-6 text-meet-gray">
            <span className="font-medium">Moogle </span>
            <span>Meet</span>
          </div>
        </a>
      </div>
      <div className="flex items-center cursor-default">
        {navItems && (
          <>
            <div className="hidden md:block mr-2 text-lg leading-4.5 text-meet-gray">
              {currentDateTime}
            </div>
            <div className="hidden sm:contents">
              <IconButton title="Support" icon={<Help />} />
              <IconButton title="Report a problem" icon={<Feedback />} />
              <IconButton title="Settings" icon={<Settings />} />
              <div className="lg:ml-5">
                <IconButton title="Moogle apps" icon={<Apps />} />
              </div>
            </div>
          </>
        )}
        <div className="ml-2 flex items-center">
          {signedIn ? (
            <>
              {!navItems && (
                <div className="hidden sm:block mr-3 font-roboto leading-4 text-right text-meet-black">
                  <div className="text-sm leading-4">{email}</div>
                  <button
                    onClick={switchAccount}
                    className="text-sm hover:text-meet-blue"
                  >
                    Switch account
                  </button>
                </div>
              )}
              <Image
                src="https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-05.jpg"
                alt="avatar"
                width={36}
                height={36}
                className="h-full w-full rounded-full object-cover object-center"
              />
            </>
          ) : (
            <PlainButton size="sm">Sign In</PlainButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
