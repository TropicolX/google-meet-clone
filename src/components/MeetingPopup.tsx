import Image from 'next/image';

import ButtonWithIcon from './ButtonWithIcon';
import Clipboard from './Clipboard';
import Popup from './Popup';
import useLocalStorage from '../hooks/useLocalStorage';
import { useConnectedUser } from '@stream-io/video-react-sdk';

interface MeetingPopupProps {}

const MeetingPopup = ({}: MeetingPopupProps) => {
  const [seen, setSeen] = useLocalStorage('meetingPopupSeen', false);
  const user = useConnectedUser();

  const email =
    'jacobsbusayo@gmail.com' || user?.custom?.email || user?.name || user?.id;
  const clipboardValue = window.location.href
    .replace('http://', '')
    .replace('https://', '')
    .replace('/meeting', '');

  const onClose = () => {
    setSeen(true);
  };

  return (
    <Popup
      open={!seen}
      onClose={onClose}
      title={<h2>Your meeting&apos;s ready</h2>}
    >
      <div className="p-[0px_24px_24px_24px]">
        <ButtonWithIcon
          icon={
            <div className="w-[26px] flex items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
              </svg>
            </div>
          }
          rounding="lg"
          size="sm"
          variant="secondary"
        >
          Add others
        </ButtonWithIcon>
        <div className="mt-2 text-[#3c4043] text-sm font-[Roboto] tracking-[.0142857143rem]">
          Or share this meeting link with others you want in the meeting
        </div>
        <div className="mt-2">
          <Clipboard value={clipboardValue} />
        </div>
        <div className="my-4 flex items-center gap-2">
          <Image
            width={26}
            height={26}
            alt="Your meeting is safe"
            src="https://www.gstatic.com/meet/security_shield_with_background_2f8144e462c57b3e56354926e0cda615.svg"
          />
          <div className="text-xs font-[Roboto] text-[#5f6368] tracking-[.025rem]">
            People who use this meeting link must get your permission before
            they can join.
          </div>
        </div>
        <div className="text-xs font-[Roboto] text-[#5f6368] tracking-[.025rem]">
          Joined as {email}
        </div>
      </div>
    </Popup>
  );
};

export default MeetingPopup;
