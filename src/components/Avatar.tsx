import { useMemo } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import useUserColor from '../hooks/useUserColor';

interface AvatarProps {
  width?: number;
  text?: string;
  participant?: {
    name?: string;
    image?: string;
  };
}

export const avatarClassName = 'avatar';
const IMAGE_SIZE = 160;

const Avatar = ({ text = '', width, participant = {} }: AvatarProps) => {
  const color = useUserColor();

  const name = participant?.name!;

  const randomColor = useMemo(() => {
    if (text) return color('Anonymous');

    return color(name);
  }, [color, name, text]);

  const image = participant?.image;

  if (image)
    return (
      <Image
        className="rounded-full overflow-hidden"
        src={image}
        alt={name}
        width={width || IMAGE_SIZE}
        height={width || IMAGE_SIZE}
      />
    );

  return (
    <div
      style={{
        backgroundColor: randomColor,
        width: width ? width : '30%',
      }}
      className={clsx(
        !width && 'max-w-40',
        'aspect-square rounded-full uppercase text-white font-sans-serif font-medium flex items-center justify-center',
        avatarClassName
      )}
    >
      <div className={clsx(text ? 'text-xs' : 'text-base', 'select-none')}>
        {text ? text : name[0]}
      </div>
    </div>
  );
};

export default Avatar;
