import { useMemo } from 'react';
import {
  CallParticipantResponse,
  StreamVideoParticipant,
} from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import useUserColor from '../hooks/useUserColor';

interface AvatarProps {
  width?: number;
  text?: string;
  participant?: StreamVideoParticipant | CallParticipantResponse | {};
}

export const avatarClassName = 'avatar';

const Avatar = ({ text = '', width, participant = {} }: AvatarProps) => {
  const color = useUserColor();

  const name = useMemo(() => {
    if ((participant as CallParticipantResponse)?.user) {
      return (
        (participant as CallParticipantResponse).user.name ||
        (participant as CallParticipantResponse).user.id
      );
    }
    return (
      (participant as StreamVideoParticipant).name ||
      (participant as StreamVideoParticipant).userId
    );
  }, [participant]);

  const randomColor = useMemo(() => {
    if (text) return color('Anonymous');

    return color(name);
  }, [color, name, text]);

  const image = useMemo(() => {
    if ((participant as CallParticipantResponse)?.user) {
      return (participant as CallParticipantResponse).user?.image;
    }
    return (participant as StreamVideoParticipant)?.image;
  }, [participant]);

  if (image)
    return (
      <img
        className="w-[160px] h-[160px] rounded-full overflow-hidden"
        src={image}
        alt={name}
      />
    );

  return (
    <div
      style={{
        backgroundColor: randomColor,
      }}
      className={clsx(
        width ? `w-[${width}px]` : 'w-[30%] max-w-[10rem]',
        `aspect-square rounded-full uppercase text-white font-[sans-serif] font-medium flex items-center justify-center ${avatarClassName}`
      )}
    >
      <span className={clsx(text ? 'text-[.75rem]' : 'text-[1rem]')}>
        {text ? text : name[0]}
      </span>
    </div>
  );
};

export default Avatar;
