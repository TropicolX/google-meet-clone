'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CallingState,
  PaginatedGridLayout,
  StreamTheme,
  useCall,
  useCallStateHooks,
  useConnectedUser,
} from '@stream-io/video-react-sdk';

import IconButton from '../../../components/IconButton';
import ParticipantViewUI from '../../../components/ParticipantViewUI';
import useTime from '../../../hooks/useTime';
import VideoPlaceholder from '../../../components/VideoPlaceholder';
import MeetingPopup from '../../../components/MeetingPopup';
import MicOff from '../../../components/icons/MicOff';
import Mic from '../../../components/icons/Mic';
import Videocam from '../../../components/icons/Videocam';
import VideocamOff from '../../../components/icons/VideocamOff';
import useAnimateGrid from '../../../hooks/useAnimateGrid';

interface MeetingProps {
  params: {
    meetingId: string;
  };
}

const Meeting = ({ params }: MeetingProps) => {
  const { meetingId } = params;
  const router = useRouter();
  const call = useCall();
  const user = useConnectedUser();
  const { currentTime } = useTime();
  const { ref } = useAnimateGrid();
  const { useCameraState, useMicrophoneState, useCallCallingState } =
    useCallStateHooks();
  const callingState = useCallCallingState();
  const { camera, optimisticIsMute: isCameraMute } = useCameraState();
  const { microphone, optimisticIsMute: isMicrophoneMute } =
    useMicrophoneState();
  const isCreator = call?.state.createdBy?.id === user?.id;

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
      <div
        ref={ref}
        className="relative w-[100svw] h-[100svh] bg-[#202124] overflow-hidden"
      >
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
              <span>{'|'}</span>
              <span className="font-medium truncate">{meetingId}</span>
            </div>
          </div>
          {/* Meeting Controls */}
          <div className="flex flex-[1_1_25%] items-center justify-center px-[6px] gap-3">
            {/* Microphone control */}
            <IconButton
              icon={isMicrophoneMute ? <MicOff /> : <Mic />}
              onClick={toggleMicrophone}
              active={isMicrophoneMute}
              variant="secondary"
            />
            {/* Camera control */}
            <IconButton
              icon={isCameraMute ? <VideocamOff /> : <Videocam />}
              onClick={toggleCamera}
              active={isCameraMute}
              variant="secondary"
            />
          </div>
          {/* Other controls */}
          <div className="flex flex-[1_1_25%] items-center justify-end">
            {/* Microphone control */}
            <IconButton
              icon={isMicrophoneMute ? <MicOff /> : <Mic />}
              onClick={toggleMicrophone}
              active={isMicrophoneMute}
            />
            {/* Camera control */}
            <IconButton
              icon={isCameraMute ? <VideocamOff /> : <Videocam />}
              onClick={toggleCamera}
              active={isCameraMute}
            />
          </div>
        </div>
        {isCreator && <MeetingPopup />}
      </div>
    </StreamTheme>
  );
};

export default Meeting;
