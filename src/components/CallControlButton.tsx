import IconButton, { IconButtonProps } from './IconButton';
import clsx from 'clsx';

interface CallControlButtonProps extends Omit<IconButtonProps, 'variant'> {}

const CallControlButton = ({
  active,
  alert,
  className,
  icon,
  onClick,
  title,
}: CallControlButtonProps) => {
  return (
    <IconButton
      variant="secondary"
      active={active}
      alert={alert}
      icon={icon}
      title={title}
      className={clsx(
        'rounded-full h-12 bg-dark-gray border-dark-gray hover:bg-[#444649]',
        className || 'w-14'
      )}
      onClick={onClick}
    />
  );
};

export default CallControlButton;
