'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CallingState,
  CallParticipantResponse,
  useCall,
  useCallStateHooks,
  useConnectedUser,
} from '@stream-io/video-react-sdk';

import Button from '../../components/Button';
import CallParticipants from '../../components/CallParticipants';
import Header from '../../components/Header';
import MeetingPreview from '../../components/MeetingPreview';
import Spinner from '../../components/Spinner';

interface LobbyProps {
  params: {
    meetingId: string;
  };
}

const Lobby = ({ params }: LobbyProps) => {
  const { meetingId } = params;
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [participants, setParticipants] = useState<CallParticipantResponse[]>(
    []
  );

  const router = useRouter();
  const connectedUser = useConnectedUser();
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    const leavePreviousCall = async () => {
      if (callingState === CallingState.JOINED && !joining) {
        await call?.leave();
      }
    };

    const getCurrentCall = async () => {
      if (!(call && connectedUser)) return;

      const callData = await call.getOrCreate({
        data: {
          members: [
            {
              user_id: connectedUser.id,
              role: 'host',
            },
          ],
        },
      });

      setParticipants(callData.call.session?.participants || []);
      setLoading(false);
    };

    leavePreviousCall();
    !joining && getCurrentCall();
  }, [call, connectedUser, callingState, joining]);

  const joinCall = async () => {
    setJoining(true);
    if (callingState !== CallingState.JOINED) {
      await call?.join();
    }
    router.push(`/${meetingId}/meeting`);
  };

  const heading = useMemo(() => {
    if (loading) return 'Getting ready...';
    return 'Ready to join?';
  }, [loading]);

  const participantsUI = useMemo(() => {
    switch (true) {
      case loading:
        return "You'll be able to join in just a moment";
      case joining:
        return "You'll join the call in just a moment";
      case participants.length === 0:
        return 'No one else is here';
      case participants.length > 0:
        return <CallParticipants participants={participants} />;
      default:
        return null;
    }
  }, [loading, joining, participants]);

  return (
    <div>
      <Header navItems={false} />
      <main className="min-[1000px]:h-[calc(100svh-80px)] p-4 mt-3 flex flex-col min-[1000px]:flex-row items-center justify-center gap-8 min-[1000px]:gap-0">
        <MeetingPreview />
        <div className="flex flex-col items-center min-[1000px]:justify-center gap-4 flex-[0_0_448px] h-[540px] mr-2 min-[1000px]:mb-[52px]">
          <h2 className="text-[#000000DE] text-[1.75rem] leading-[2.25rem] text-center truncate">
            {heading}
          </h2>
          <span className="text-[#202124] font-medium text-center text-[0.875rem] leading-[1.25rem] cursor-default">
            {participantsUI}
          </span>
          <div className="[&>button]:w-[240px]">
            {!joining && !loading && (
              <Button onClick={joinCall} rounding="lg">
                Join now
              </Button>
            )}
            {(joining || loading) && (
              <div className="h-[56px] pb-[9.5px]">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lobby;
