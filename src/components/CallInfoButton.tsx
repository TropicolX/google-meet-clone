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
      className={clsx('call-info-button', className)}
      onClick={onClick}
    />
  );
};

export default CallInfoButton;
