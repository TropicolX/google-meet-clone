import { useEffect, useState } from 'react';
import {
  VideoPreview,
  useCallStateHooks,
  useConnectedUser,
} from '@stream-io/video-react-sdk';

import {
  AudioInputDeviceSelector,
  AudioOutputDeviceSelector,
  VideoInputDeviceSelector,
} from './DeviceSelector';
import IconButton from './IconButton';
import MoreVert from './icons/MoreVert';
import Mic from './icons/Mic';
import MicOff from './icons/MicOff';
import SpeechIndicator from './SpeechIndicator';
import Videocam from './icons/Videocam';
import VideocamOff from './icons/VideocamOff';
import VisualEffects from './icons/VisualEffects';
import useSoundDetected from '../hooks/useSoundDetected';

const MeetingPreview = () => {
  const user = useConnectedUser();
  const soundDetected = useSoundDetected();
  const [videoPreviewText, setVideoPreviewText] = useState('');
  const [displaySelectors, setDisplaySelectors] = useState(false);
  const [devicesEnabled, setDevicesEnabled] = useState(false);
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const {
    camera,
    optimisticIsMute: isCameraMute,
    hasBrowserPermission: hasCameraPermission,
  } = useCameraState();
  const {
    microphone,
    optimisticIsMute: isMicrophoneMute,
    hasBrowserPermission: hasMicrophonePermission,
    status: microphoneStatus,
  } = useMicrophoneState();

  useEffect(() => {
    const enableMicAndCam = async () => {
      try {
        await camera.enable();
      } catch (error) {
        console.error(error);
      }
      try {
        await microphone.enable();
      } catch (error) {
        console.error(error);
      }
      setDevicesEnabled(true);
    };

    enableMicAndCam();
  }, [camera, microphone]);

  useEffect(() => {
    if (hasMicrophonePermission === undefined) return;
    if (
      (hasMicrophonePermission && microphoneStatus) ||
      !hasMicrophonePermission
    ) {
      setDisplaySelectors(true);
    }
  }, [microphoneStatus, hasMicrophonePermission]);

  const toggleCamera = async () => {
    try {
      setVideoPreviewText((prev) =>
        prev === '' || prev === 'Camera is off'
          ? 'Camera is starting'
          : 'Camera is off'
      );
      await camera.toggle();
      setVideoPreviewText((prev) =>
        prev === 'Camera is off' ? 'Camera is starting' : 'Camera is off'
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMicrophone = async () => {
    try {
      await microphone.toggle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-3xl lg:pr-2 lg:mt-8">
      <div className="relative w-full rounded-lg max-w-185 aspect-video mx-auto shadow-md">
        {/* Background */}
        <div className="absolute z-0 left-0 w-full h-full rounded-lg bg-meet-black" />
        {/* Gradient overlay */}
        <div className="absolute z-2 bg-gradient-overlay left-0 w-full h-full rounded-lg" />
        {/* Video preview */}
        <div className="absolute w-full h-full [&>div]:w-auto [&>div]:h-auto z-1 flex items-center justify-center rounded-lg overflow-hidden [&_video]:-scale-x-100">
          <VideoPreview
            DisabledVideoPreview={() => DisabledVideoPreview(videoPreviewText)}
          />
        </div>
        {devicesEnabled && (
          <div className="z-3 absolute bottom-4 left-1/2 -ml-17 flex items-center gap-6">
            {/* Microphone control */}
            <IconButton
              icon={isMicrophoneMute ? <MicOff /> : <Mic />}
              title={
                isMicrophoneMute ? 'Turn on microphone' : 'Turn off microphone'
              }
              onClick={toggleMicrophone}
              active={isMicrophoneMute}
              alert={!hasMicrophonePermission}
              variant="secondary"
            />
            {/* Camera control */}
            <IconButton
              icon={isCameraMute ? <VideocamOff /> : <Videocam />}
              title={isCameraMute ? 'Turn on camera' : 'Turn off camera'}
              onClick={toggleCamera}
              active={isCameraMute}
              alert={!hasCameraPermission}
              variant="secondary"
            />
          </div>
        )}
        {/* Speech Indicator */}
        {microphoneStatus && microphoneStatus === 'enabled' && (
          <div className="z-2 absolute bottom-3.5 left-3.5 w-6.5 h-6.5 flex items-center justify-center bg-primary rounded-full">
            <SpeechIndicator isSpeaking={soundDetected} />
          </div>
        )}
        {/* User name */}
        {devicesEnabled && hasCameraPermission && (
          <div className="z-3 max-w-94 h-8 absolute left-0 top-3 mt-1.5 mb-1 mx-4 truncate text-white text-sm font-medium leading-5 flex items-center justify-start cursor-default select-none">
            {user?.name}
          </div>
        )}
        {devicesEnabled && (
          <>
            <div className="z-2 absolute top-2.5 right-1 [&>button]:w-12 [&>button]:h-12 [&>button]:border-none [&>button]:transition-none [&>button]:hover:bg-[rgba(255,255,255,.2)] [&>button]:hover:shadow-none">
              <IconButton
                title="More options"
                icon={<MoreVert />}
                variant="secondary"
              />
            </div>
            <div className="z-3 absolute bottom-4 right-2.5">
              <IconButton
                icon={<VisualEffects />}
                title="Apply visual effects"
                variant="secondary"
              />
            </div>
          </>
        )}
      </div>
      <div className="hidden lg:flex h-17 items-center gap-1 mt-4 ml-2">
        {displaySelectors && (
          <>
            <AudioInputDeviceSelector disabled={!hasMicrophonePermission} />
            <AudioOutputDeviceSelector disabled={!hasMicrophonePermission} />
            <VideoInputDeviceSelector disabled={!hasCameraPermission} />
          </>
        )}
      </div>
    </div>
  );
};

export const DisabledVideoPreview = (videoPreviewText: string) => {
  return (
    <div className="text-2xl font-roboto text-white">{videoPreviewText}</div>
  );
};

export default MeetingPreview;
