import { useCallStateHooks } from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import {
  AudioInputDeviceSelector,
  AudioOutputDeviceSelector,
} from './DeviceSelector';
import CallControlButton from './CallControlButton';
import MicFilled from './icons/MicFilled';
import MicOffFilled from './icons/MicOffFilled';
import ToggleButtonContainer from './ToggleButtonContainer';

const ICON_SIZE = 20;

const ToggleAudioButton = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const {
    microphone,
    optimisticIsMute: isMicrophoneMute,
    hasBrowserPermission,
  } = useMicrophoneState();

  const toggleMicrophone = async () => {
    try {
      await microphone.toggle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ToggleButtonContainer
      deviceSelectors={
        <>
          <AudioInputDeviceSelector
            className="w-[12.375rem]"
            dark
            disabled={!hasBrowserPermission}
          />
          <AudioOutputDeviceSelector
            className="w-[12.375rem]"
            dark
            disabled={!hasBrowserPermission}
          />
        </>
      }
    >
      <CallControlButton
        icon={
          isMicrophoneMute ? (
            <MicOffFilled width={ICON_SIZE} height={ICON_SIZE} />
          ) : (
            <MicFilled width={ICON_SIZE} height={ICON_SIZE} />
          )
        }
        title={isMicrophoneMute ? 'Turn on microphone' : 'Turn off microphone'}
        onClick={toggleMicrophone}
        active={isMicrophoneMute}
        alert={!hasBrowserPermission}
        className={clsx(isMicrophoneMute && 'toggle-button-alert')}
      />
    </ToggleButtonContainer>
  );
};

export default ToggleAudioButton;
