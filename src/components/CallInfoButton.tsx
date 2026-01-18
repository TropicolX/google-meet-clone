import IconButton, { IconButtonProps } from './IconButton';
import clsx from 'clsx';

interface CallInfoButtonProps extends Omit<IconButtonProps, 'variant'> {}

const CallInfoButton = ({
  active,
  alert,
  className,
  icon,
  onClick,
  title,
}: CallInfoButtonProps) => {
  return (
    <IconButton
      variant="secondary"
      active={active}
      alert={alert}
      icon={icon}
      title={title}
      className={clsx(
        'rounded-full w-12 h-12 bg-transparent border-transparent p-3 hover:bg-[#28292c]',
        className
      )}
      onClick={onClick}
    />
  );
};

export default CallInfoButton;
