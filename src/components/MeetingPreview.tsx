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
import useSoundDetected from '../hooks/useSoundDetected';

const MeetingPreview = () => {
  const user = useConnectedUser();
  const soundDetected = useSoundDetected();
  const [videoPreviewText, setVideoPreviewText] = useState('');
  const [displaySelectors, setDisplaySelectors] = useState(false);
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
        console.log(error);
      }
      try {
        await microphone.enable();
      } catch (error) {
        console.log(error);
      }
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
    <div className="w-full max-w-[764px] min-[1000px]:pr-2 min-[1000px]:mt-[32px]">
      <div className="relative w-full rounded-lg max-w-[740px] aspect-video mx-auto shadow-md">
        {/* Background */}
        <div className="absolute z-0 left-0 w-full h-full rounded-lg bg-[#202124]" />
        {/* Gradient overlay */}
        <div
          className="absolute z-[2] left-0 w-full h-full rounded-lg"
          style={{
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.30015756302521013) 11%, rgba(0,0,0,0) 21%, rgba(0,0,0,0) 79%, rgba(0,0,0,0.30015756302521013) 89%, rgba(0,0,0,0.7035189075630253) 100%)',
          }}
        />
        {/* Video preview */}
        <div className="absolute w-full h-full [&>div]:w-auto [&>div]:h-auto z-[1] flex items-center justify-center rounded-lg overflow-hidden [&_video]:scale-x-[-1]">
          <VideoPreview
            DisabledVideoPreview={() => DisabledVideoPreview(videoPreviewText)}
          />
        </div>
        <div className="z-[3] absolute bottom-4 left-[50%] ml-[-68px] flex items-center gap-6">
          {/* Microphone control */}
          <IconButton
            icon={isMicrophoneMute ? <MicOff /> : <Mic />}
            onClick={toggleMicrophone}
            active={isMicrophoneMute}
            alert={!hasMicrophonePermission}
            variant="secondary"
          />
          {/* Camera control */}
          <IconButton
            icon={isCameraMute ? <VideocamOff /> : <Videocam />}
            onClick={toggleCamera}
            active={isCameraMute}
            alert={!hasCameraPermission}
            variant="secondary"
          />
        </div>
        {/* Speech Indicator */}
        {microphoneStatus && microphoneStatus === 'enabled' && (
          <div className="z-[2] absolute bottom-[.875rem] left-[.875rem] w-[26px] h-[26px] flex items-center justify-center bg-[#1a73e8] rounded-full">
            <SpeechIndicator isSpeaking={soundDetected} />
          </div>
        )}
        {/* User name */}
        {hasCameraPermission && (
          <div className="z-[2] absolute truncate font-medium leading-[1.25rem] cursor-default select-none top-[.75rem] flex items-center justify-start left-0 max-w-[23.5rem] h-[2rem] text-white text-[.875rem] m-[.375rem_1rem_.25rem]">
            {user?.name}
          </div>
        )}
        {/* More options */}
        <div className="z-[2] absolute top-[10px] right-1 [&>button]:w-[48px] [&>button]:h-[48px] [&>button]:border-none [&>button]:transition-none [&>button]:hover:bg-[rgba(255,255,255,.2)] [&>button]:hover:shadow-none">
          <IconButton icon={<MoreVert />} variant="secondary" />
        </div>
      </div>
      <div className="hidden min-[1000px]:flex h-[68px] items-center gap-1 mt-4 ml-2">
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
    <div className="text-[24px] font-[Roboto] text-white">
      {videoPreviewText}
    </div>
  );
};

export default MeetingPreview;
