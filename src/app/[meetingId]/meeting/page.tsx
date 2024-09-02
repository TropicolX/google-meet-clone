'use client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  CallingState,
  PaginatedGridLayout,
  StreamTheme,
  useCall,
  useCallStateHooks,
  useConnectedUser,
} from '@stream-io/video-react-sdk';

import BackHand from '@/components/icons/BackHand';
import CallControlButton from '@/components/CallControlButton';
import CallInfoButton from '@/components/CallInfoButton';
import CallEndFilled from '@/components/icons/CallEndFilled';
import Chat from '@/components/icons/Chat';
import ClosedCaptions from '@/components/icons/ClosedCaptions';
import Group from '@/components/icons/Group';
import Info from '@/components/icons/Info';
import Mood from '@/components/icons/Mood';
import ParticipantViewUI from '@/components/ParticipantViewUI';
import PresentToAll from '@/components/icons/PresentToAll';
import MeetingPopup from '@/components/MeetingPopup';
import MoreVert from '../../../components/icons/MoreVert';
import ToggleAudioButton from '@/components/ToggleAudioButton';
import ToggleVideoButton from '@/components/ToggleVideoButton';
import VideoPlaceholder from '@/components/VideoPlaceholder';
import useAnimateGrid from '@/hooks/useAnimateGrid';
import useTime from '@/hooks/useTime';

interface MeetingProps {
  params: {
    meetingId: string;
  };
}

const Meeting = ({ params }: MeetingProps) => {
  const { meetingId } = params;
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();
  const call = useCall();
  const user = useConnectedUser();
  const { currentTime } = useTime();
  const { ref } = useAnimateGrid();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const isCreator = call?.state.createdBy?.id === user?.id;

  useEffect(() => {
    const startup = async () => {
      if (
        callingState === CallingState.UNKNOWN ||
        callingState === CallingState.IDLE
      ) {
        router.push(`/${meetingId}`);
      } else {
        await audioRef.current?.play();
      }
    };
    startup();
  }, [callingState, router, meetingId]);

  const leaveCall = async () => {
    await call?.leave();
    router.push(`/${meetingId}/meeting-end`);
  };

  if (callingState !== CallingState.JOINED) return null;

  return (
    <StreamTheme className="root-theme">
      <div className="relative w-svw h-svh bg-meet-black overflow-hidden">
        <div
          ref={ref}
          className="w-full h-[calc(100%-5rem)] pt-4 px-4 relative"
        >
          <PaginatedGridLayout
            ParticipantViewUI={ParticipantViewUI}
            VideoPlaceholder={VideoPlaceholder}
            groupSize={6}
          />
        </div>
        <div className="absolute left-0 bottom-0 right-0 w-full h-20 bg-meet-black text-white text-center flex items-center justify-between">
          {/* Meeting ID */}
          <div className="hidden sm:flex grow shrink basis-1/4 items-center text-start justify-start ml-3 truncate max-w-full">
            <div className="flex items-center overflow-hidden mx-3 h-20 gap-3 select-none">
              <span className="font-medium">{currentTime}</span>
              <span>{'|'}</span>
              <span className="font-medium truncate">{meetingId}</span>
            </div>
          </div>
          {/* Meeting Controls */}
          <div className="relative flex grow shrink basis-1/4 items-center justify-center px-1.5 gap-3 ml-3 sm:ml-0">
            <ToggleAudioButton />
            <ToggleVideoButton />
            <CallControlButton
              icon={<ClosedCaptions />}
              title={'Turn on captions'}
            />
            <CallControlButton
              icon={<Mood />}
              title={'Send a reaction'}
              className="hidden sm:inline-flex"
            />
            <CallControlButton icon={<PresentToAll />} title={'Present now'} />
            <CallControlButton icon={<BackHand />} title={'Raise hand'} />
            <CallControlButton icon={<MoreVert />} title={'More options'} />
            <CallControlButton
              onClick={leaveCall}
              icon={<CallEndFilled />}
              title={'Leave call'}
              className="leave-call-button"
            />
          </div>
          {/* Meeting Info */}
          <div className="hidden sm:flex grow shrink basis-1/4 items-center justify-end mr-3">
            <CallInfoButton icon={<Info />} title="Meeting details" />
            <CallInfoButton icon={<Group />} title="People" />
            <CallInfoButton icon={<Chat />} title="Chat with everyone" />
          </div>
        </div>
        {isCreator && <MeetingPopup />}
        <audio
          ref={audioRef}
          src="https://www.gstatic.com/meet/sounds/join_call_6a6a67d6bcc7a4e373ed40fdeff3930a.ogg"
        />
      </div>
      {/* <CallControls /> */}
    </StreamTheme>
  );
};

export default Meeting;
