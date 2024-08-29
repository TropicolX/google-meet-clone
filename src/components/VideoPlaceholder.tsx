import { forwardRef, useMemo } from 'react';
import {
  useParticipantViewContext,
  type VideoPlaceholderProps,
} from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import useUserColor from '../hooks/useUserColor';

const VideoPlaceholder = forwardRef<HTMLDivElement, VideoPlaceholderProps>(
  function VideoPlaceholder({ style }, ref) {
    const color = useUserColor();
    const { participant } = useParticipantViewContext();
    const name = participant.name || participant.userId;

    const randomColor = useMemo(() => {
      return color(name);
    }, []);

    return (
      <div
        ref={ref}
        style={style}
        className="absolute w-full h-full rounded-[inherit] bg-[#3c4043] flex items-center justify-center participant-view-placeholder"
      >
        {participant.image && (
          <img
            className="w-[160px] h-[160px] rounded-full overflow-hidden"
            src={participant.image}
            alt={participant.userId}
          />
        )}
        <div
          style={{
            backgroundColor: randomColor,
          }}
          className={clsx(
            participant.image && 'hidden',
            'relative w-[30%] max-w-[10rem] aspect-square uppercase rounded-full text-white font-[sans-serif] font-medium flex items-center justify-center'
          )}
        >
          <span className="mt-1 text-[clamp(16px,_calc(100vw_*_0.05),_85px)]">
            {name[0]}
          </span>
        </div>
      </div>
    );
  }
);

export default VideoPlaceholder;
