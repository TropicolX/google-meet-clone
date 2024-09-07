'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CallingState,
  CallParticipantResponse,
  ErrorFromResponse,
  useCall,
  useCallStateHooks,
  useConnectedUser,
} from '@stream-io/video-react-sdk';

import Button from '@/components/Button';
import CallParticipants from '@/components/CallParticipants';
import Header from '@/components/Header';
import MeetingPreview from '@/components/MeetingPreview';
import Spinner from '@/components/Spinner';
import { AppContext, regex } from '../../contexts/AppProvider';
import { GetCallResponse } from '@stream-io/node-sdk';

interface LobbyProps {
  params: {
    meetingId: string;
  };
}

const Lobby = ({ params }: LobbyProps) => {
  const { meetingId } = params;
  const validMeetingId = regex.test(meetingId);
  const { newMeeting, setNewMeeting } = useContext(AppContext);
  const router = useRouter();
  const connectedUser = useConnectedUser();
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [errorFetchingMeeting, setErrorFetchingMeeting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [participants, setParticipants] = useState<CallParticipantResponse[]>(
    []
  );

  useEffect(() => {
    const leavePreviousCall = async () => {
      if (callingState === CallingState.JOINED) {
        await call?.leave();
      }
    };

    const getCurrentCall = async () => {
      try {
        const callData = await call?.get();
        setParticipants(callData?.call?.session?.participants || []);
      } catch (e) {
        const err = e as ErrorFromResponse<GetCallResponse>;
        console.error(err.message);
        setErrorFetchingMeeting(true);
      }
      setLoading(false);
    };

    const createCall = async () => {
      if (!connectedUser) return;
      await call?.create({
        data: {
          members: [
            {
              user_id: connectedUser.id,
              role: 'host',
            },
          ],
        },
      });
      setLoading(false);
    };

    if (!joining && validMeetingId) {
      leavePreviousCall();
      if (newMeeting) {
        createCall();
      } else {
        getCurrentCall();
      }
    }
  }, [call, callingState, connectedUser, joining, newMeeting, validMeetingId]);

  useEffect(() => {
    setNewMeeting(newMeeting);

    return () => {
      setNewMeeting(false);
    };
  }, [newMeeting, setNewMeeting]);

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

  const joinCall = async () => {
    setJoining(true);
    if (callingState !== CallingState.JOINED) {
      await call?.join();
    }
    router.push(`/${meetingId}/meeting`);
  };

  if (!validMeetingId)
    return (
      <div>
        <Header />
        <div className="w-full h-full flex flex-col items-center justify-center mt-[6.75rem]">
          <h1 className="text-4xl leading-[2.75rem] font-normal text-dark-gray tracking-normal mb-12">
            Invalid video call name.
          </h1>
          <Button size="sm" onClick={() => router.push('/')}>
            Return to home screen
          </Button>
        </div>
      </div>
    );

  if (errorFetchingMeeting) {
    router.push(`/${meetingId}/meeting-end?invalid=true`);
  }

  return (
    <div>
      <Header navItems={false} />
      <main className="lg:h-[calc(100svh-80px)] p-4 mt-3 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
        <MeetingPreview />
        <div className="flex flex-col items-center lg:justify-center gap-4 grow-0 shrink-0 basis-112 h-135 mr-2 lg:mb-13">
          <h2 className="text-black text-3xl text-center truncate">
            {heading}
          </h2>
          <span className="text-meet-black font-medium text-center text-sm cursor-default">
            {participantsUI}
          </span>
          <div>
            {!joining && !loading && (
              <Button
                className="w-60 text-sm !bg-meet-blue !border-meet-blue hover:!bg-primary"
                onClick={joinCall}
                rounding="lg"
              >
                Join now
              </Button>
            )}
            {(joining || loading) && (
              <div className="h-14 pb-2.5">
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
