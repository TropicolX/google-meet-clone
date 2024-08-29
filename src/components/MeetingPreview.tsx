import { useEffect, useState } from 'react';
import {
  VideoPreview,
  useCallStateHooks,
  useConnectedUser,
} from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import {
  AudioInputDeviceSelector,
  AudioOutputDeviceSelector,
  VideoInputDeviceSelector,
} from './DeviceSelector';
import IconButton from './IconButton';
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
        <div className="absolute z-0 left-0 w-full h-full rounded-lg bg-[#202124]"></div>
        <div
          className="absolute z-[2] left-0 w-full h-full rounded-lg bg-[#202124]"
          style={{
            background:
              'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.30015756302521013) 11%, rgba(0,0,0,0) 21%, rgba(0,0,0,0) 79%, rgba(0,0,0,0.30015756302521013) 89%, rgba(0,0,0,0.7035189075630253) 100%)',
          }}
        ></div>
        <div className="absolute w-full h-full [&>div]:w-auto [&>div]:h-auto z-[1] flex items-center justify-center rounded-lg overflow-hidden [&_video]:scale-x-[-1]">
          <VideoPreview
            DisabledVideoPreview={() => DisabledVideoPreview(videoPreviewText)}
          />
        </div>

        {hasCameraPermission && (
          <div className="z-[2] absolute truncate font-medium leading-[1.25rem] cursor-default select-none top-[.75rem] flex items-center justify-start left-0 max-w-[23.5rem] h-[2rem] text-white text-[.875rem] m-[.375rem_1rem_.25rem]">
            {user?.name}
          </div>
        )}
        {/* More options */}
        <div className="z-[2] absolute top-[10px] right-1 [&>button]:w-[48px] [&>button]:h-[48px] [&>button]:border-none [&>button]:transition-none [&>button]:hover:bg-[rgba(255,255,255,.2)] [&>button]:hover:shadow-none">
          <IconButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
              </svg>
            }
            variant="secondary"
          />
        </div>
        {/* Speech Indicator */}
        {microphoneStatus && microphoneStatus === 'enabled' && (
          <div className="z-[2] absolute bottom-[.875rem] left-[.875rem] w-[26px] h-[26px] flex items-center justify-center bg-[#1a73e8] rounded-full">
            <span
              className={clsx(
                'str-video__speech-indicator',
                'str-video__speech-indicator--dominant',
                soundDetected && 'str-video__speech-indicator--speaking'
              )}
            >
              <span className="str-video__speech-indicator__bar" />
              <span className="str-video__speech-indicator__bar" />
              <span className="str-video__speech-indicator__bar" />
            </span>
          </div>
        )}
        <div className="z-[3] absolute bottom-4 left-[50%] ml-[-68px] flex items-center gap-6">
          {/* Microphone control */}
          <IconButton
            icon={
              isMicrophoneMute ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#fff"
                >
                  <path d="m710-362-58-58q14-23 21-48t7-52h80q0 44-13 83.5T710-362ZM480-594Zm112 112-72-72v-206q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v126l-80-80v-46q0-50 35-85t85-35q50 0 85 35t35 85v240q0 11-2.5 20t-5.5 18ZM440-120v-123q-104-14-172-93t-68-184h80q0 83 57.5 141.5T480-320q34 0 64.5-10.5T600-360l57 57q-29 23-63.5 39T520-243v123h-80Zm352 64L56-792l56-56 736 736-56 56Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#fff"
                >
                  <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                </svg>
              )
            }
            onClick={toggleMicrophone}
            active={isMicrophoneMute}
            alert={!hasMicrophonePermission}
            variant="secondary"
          />
          {/* Camera control */}
          <IconButton
            icon={
              isCameraMute ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#fff"
                >
                  <path d="M880-260 720-420v67l-80-80v-287H353l-80-80h367q33 0 56.5 23.5T720-720v180l160-160v440ZM822-26 26-822l56-56L878-82l-56 56ZM498-575ZM382-464ZM160-800l80 80h-80v480h480v-80l80 80q0 33-23.5 56.5T640-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#fff"
                >
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
                </svg>
              )
            }
            onClick={toggleCamera}
            active={isCameraMute}
            alert={!hasCameraPermission}
            variant="secondary"
          />
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
