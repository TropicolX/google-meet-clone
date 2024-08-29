'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CallingState,
  PaginatedGridLayout,
  StreamTheme,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import IconButton from '../../../components/IconButton';
import ParticipantViewUI from '../../../components/ParticipantViewUI';
import useTime from '../../../hooks/useTime';
import VideoPlaceholder from '../../../components/VideoPlaceholder';
import MeetingPopup from '../../../components/MeetingPopup';

interface MeetingProps {
  params: {
    meetingId: string;
  };
}

const Meeting = ({ params }: MeetingProps) => {
  const { meetingId } = params;
  const router = useRouter();
  const call = useCall();
  const { currentTime } = useTime();
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { camera, optimisticIsMute: isCameraMute } = useCameraState();
  const { microphone, optimisticIsMute: isMicrophoneMute } =
    useMicrophoneState();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    if (
      callingState === CallingState.UNKNOWN ||
      callingState === CallingState.IDLE
    ) {
      router.push(`/${meetingId}`);
    }
  }, [callingState, router, meetingId]);

  const toggleCamera = async () => {
    try {
      await camera.toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMicrophone = async () => {
    try {
      await microphone.toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const leaveCall = async () => {
    await call?.leave();
    router.push(`/${meetingId}`);
  };

  if (callingState !== CallingState.JOINED) return null;

  return (
    <StreamTheme className="root-theme">
      <div className="relative w-[100svw] h-[100svh] bg-[#202124] overflow-hidden">
        <div className="w-full h-[calc(100%-5rem)] pt-4 px-4 relative">
          <PaginatedGridLayout
            ParticipantViewUI={ParticipantViewUI}
            VideoPlaceholder={VideoPlaceholder}
            groupSize={6}
          />
        </div>
        <div className="absolute left-0 bottom-0 right-0 w-full h-[5rem] bg-[#202124] text-white text-center flex items-center justify-between">
          {/* Meeting ID */}
          <div className="flex flex-[1_1_25%] items-center text-start justify-start ml-3 truncate max-w-full">
            <div className="flex items-center overflow-hidden mx-3 h-[5rem] gap-3">
              <span className="font-medium">{currentTime}</span>
              <span className="font-medium truncate">{'|'}</span>
              <span className="font-medium truncate">{meetingId}</span>
            </div>
          </div>
          {/* Meeting Controls */}
          <div className="flex flex-[1_1_25%] items-center justify-center px-[6px] gap-3">
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
              variant="secondary"
            />
          </div>
          {/* Other controls */}
          <div className="flex flex-[1_1_25%] items-center justify-end">
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
            />
          </div>
        </div>
        <MeetingPopup />
      </div>
    </StreamTheme>
  );
};

export default Meeting;
