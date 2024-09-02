import React from 'react';
import { useCallStateHooks } from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import CallControlButton from './CallControlButton';
import ToggleButtonContainer from './ToggleButtonContainer';
import Videocam from './icons/Videocam';
import VideocamOff from './icons/VideocamOff';
import VisualEffects from './icons/VisualEffects';
import { VideoInputDeviceSelector } from './DeviceSelector';

interface ToggleVideoButtonProps {}

const ToggleVideoButton = ({}: ToggleVideoButtonProps) => {
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
        <VideoInputDeviceSelector className="w-[23.125rem]" dark />
      }
      icons={
        <div title="Apply visual effects">
          <VisualEffects width={20} height={20} />
        </div>
      }
    >
      <CallControlButton
        icon={
          isCameraMute ? (
            <VideocamOff width={20} height={20} />
          ) : (
            <Videocam width={20} height={20} />
          )
        }
        title={isCameraMute ? 'Turn on camera' : 'Turn off camera'}
        onClick={toggleCamera}
        active={isCameraMute}
        alert={!hasBrowserPermission}
        className={clsx(isCameraMute && 'toggle-button-alert')}
      />
    </ToggleButtonContainer>
  );
};

export default ToggleVideoButton;
