import { useCallStateHooks } from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import CallControlButton from './CallControlButton';
import ToggleButtonContainer from './ToggleButtonContainer';
import Videocam from './icons/Videocam';
import VideocamOff from './icons/VideocamOff';
import VisualEffects from './icons/VisualEffects';
import { VideoInputDeviceSelector } from './DeviceSelector';

const ICON_SIZE = 24;

const ToggleVideoButton = () => {
  const { useCameraState } = useCallStateHooks();
  const {
    camera,
    optimisticIsMute: isCameraMute,
    hasBrowserPermission,
  } = useCameraState();

  const toggleCamera = async () => {
    try {
      await camera.toggle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ToggleButtonContainer
      deviceSelectors={
        <VideoInputDeviceSelector
          className="w-[23.125rem]"
          dark
          disabled={!hasBrowserPermission}
        />
      }
      icons={
        <div title="Apply visual effects">
          <VisualEffects width={ICON_SIZE} height={ICON_SIZE} />
        </div>
      }
      active={isCameraMute}
    >
      <CallControlButton
        icon={isCameraMute ? VideocamOff : Videocam}
        title={isCameraMute ? 'Turn on camera' : 'Turn off camera'}
        onClick={toggleCamera}
        active={isCameraMute}
        alert={!hasBrowserPermission}
        className={clsx('w-12 h-12', isCameraMute && 'toggle-button-alert')}
      />
    </ToggleButtonContainer>
  );
};

export default ToggleVideoButton;
