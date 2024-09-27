import { MutableRefObject, useEffect, useState } from 'react';
import {
  CallRecording,
  CallRecordingList,
  useCall,
} from '@stream-io/video-react-sdk';

import Popup from './Popup';
import useClickOutside from '../hooks/useClickOutside';

interface RecordingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecordingsPopup = ({ isOpen, onClose }: RecordingsPopupProps) => {
  const call = useCall();
  const [callRecordings, setCallRecordings] = useState<CallRecording[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useClickOutside(() => {
    onClose();
  }, true) as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const fetchCallRecordings = async () => {
      try {
        const response = await call?.queryRecordings();
        setCallRecordings(response?.recordings || []);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    call && isOpen && fetchCallRecordings();
  }, [call, isOpen]);

  return (
    <Popup
      ref={ref}
      open={isOpen}
      className="left-auto right-[0] bottom-[3.25rem] overflow-hidden !bg-container-gray shadow-[0_2px_2px_0_rgba(0,0,0,.14),0_3px_1px_-2px_rgba(0,0,0,.12),0_1px_5px_0_rgba(0,0,0,.2)]"
    >
      <div className="w-full min-h-[7rem] py-8 px-4">
        <CallRecordingList callRecordings={callRecordings} loading={loading} />
      </div>
    </Popup>
  );
};

export default RecordingsPopup;
