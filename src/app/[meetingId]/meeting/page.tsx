'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CallingState,
  hasScreenShare,
  isPinned,
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
import GridLayout from '../../../components/GridLayout';
import Group from '@/components/icons/Group';
import Info from '@/components/icons/Info';
import Mood from '@/components/icons/Mood';
import PresentToAll from '@/components/icons/PresentToAll';
import MeetingPopup from '@/components/MeetingPopup';
import MoreVert from '@/components/icons/MoreVert';
import SpeakerLayout from '../../../components/SpeakerLayout';
import ToggleAudioButton from '@/components/ToggleAudioButton';
import ToggleVideoButton from '@/components/ToggleVideoButton';
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
  const { useCallCallingState, useParticipants, useScreenShareState } =
    useCallStateHooks();
  const participants = useParticipants();
  const { screenShare } = useScreenShareState();
  const callingState = useCallCallingState();

  const [participantInSpotlight, _] = participants;
  const [prevParticipantsCount, setPrevParticipantsCount] = useState(0);
  const isCreator = call?.state.createdBy?.id === user?.id;

  useEffect(() => {
    const startup = async () => {
      if (
        callingState === CallingState.UNKNOWN ||
        callingState === CallingState.IDLE
      ) {
        router.push(`/${meetingId}`);
      }
    };
    startup();
  }, [callingState, router, meetingId]);

  useEffect(() => {
    if (participants.length > prevParticipantsCount) {
      audioRef.current?.play();
      setPrevParticipantsCount(participants.length);
    }
  }, [participants.length, prevParticipantsCount]);

  const isSpeakerLayout = useMemo(() => {
    if (participantInSpotlight) {
      return (
        hasScreenShare(participantInSpotlight) ||
        isPinned(participantInSpotlight)
      );
    }
    return false;
  }, [participantInSpotlight]);

  const leaveCall = async () => {
    await call?.leave();
    router.push(`/${meetingId}/meeting-end`);
  };

  const toggleScreenShare = async () => {
    try {
      await screenShare.toggle();
    } catch (error) {
      console.error(error);
    }
  };

  if (
    callingState === CallingState.UNKNOWN ||
    callingState === CallingState.IDLE
  )
    return null;

  return (
    <StreamTheme className="root-theme">
      <div className="relative w-svw h-svh bg-meet-black overflow-hidden">
        {isSpeakerLayout && <SpeakerLayout />}
        {!isSpeakerLayout && <GridLayout />}
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
          <div className="relative flex grow shrink basis-1/4 items-center justify-center px-1.5 gap-3 ml-0">
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
            <CallControlButton
              onClick={toggleScreenShare}
              icon={<PresentToAll />}
              title={'Present now'}
            />
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
