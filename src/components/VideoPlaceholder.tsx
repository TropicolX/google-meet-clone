import { forwardRef, useMemo } from 'react';
import Image from 'next/image';
import {
  useParticipantViewContext,
  type VideoPlaceholderProps,
} from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import useUserColor from '../hooks/useUserColor';

export const placeholderClassName = 'participant-view-placeholder';
const WIDTH = 160;

const VideoPlaceholder = forwardRef<HTMLDivElement, VideoPlaceholderProps>(
  function VideoPlaceholder({ style }, ref) {
    const color = useUserColor();
    const { participant } = useParticipantViewContext();
    const name = participant.name || participant.userId;

    const randomColor = useMemo(() => {
      return color(name);
    }, [color, name]);

    return (
      <div
        ref={ref}
        style={style}
        className={`absolute w-full h-full rounded-[inherit] bg-dark-gray flex items-center justify-center ${placeholderClassName}`}
      >
        {participant.image && (
          <Image
            className="max-w-3/10 rounded-full overflow-hidden"
            src={participant.image}
            alt={participant.userId}
            width={WIDTH}
            height={WIDTH}
          />
        )}
        <div
          style={{
            backgroundColor: randomColor,
          }}
          className={clsx(
            participant.image && 'hidden',
            'relative avatar w-3/10 max-w-40 aspect-square uppercase rounded-full text-white font-sans-serif font-medium flex items-center justify-center'
          )}
        >
          <span className="text-[clamp(30px,_calc(100vw_*_0.05),_65px)] select-none">
            {name[0]}
          </span>
        </div>
      </div>
    );
  }
);

export default VideoPlaceholder;
