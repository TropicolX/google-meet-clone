'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CallingState, useCallStateHooks } from '@stream-io/video-react-sdk';

import Button from '@/components/Button';
import PlainButton from '@/components/PlainButton';

interface MeetingEndProps {
  params: {
    meetingId: string;
  };
  searchParams?: {
    invalid: string;
  };
}

const MeetingEnd = ({ params, searchParams }: MeetingEndProps) => {
  const { meetingId } = params;
  const router = useRouter();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [countdownNumber, setCountdownNumber] = useState(60);
  const invalidMeeting = searchParams?.invalid === 'true';

  useEffect(() => {
    if (!invalidMeeting && callingState !== CallingState.LEFT) {
      router.push(`/`);
    }
    audioRef.current?.play();
    setCountdownNumber(59);

    const interval = setInterval(() => {
      setCountdownNumber((prev) => (prev ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdownNumber === 0) {
      returnHome();
    }
  }, [countdownNumber]);

  const rejoinMeeting = () => {
    router.push(`/${meetingId}`);
  };

  const returnHome = () => {
    router.push('/');
  };

  if (!invalidMeeting && callingState !== CallingState.LEFT) return null;

  return (
    <div className="w-full">
      <div className="m-5 h-14 flex items-center justify-start gap-2">
        <div className="relative w-14 h-14 p-2 flex items-center justify-center text-center">
          <div className="text-meet-black font-normal text-sm font-roboto select-none">
            {countdownNumber}
          </div>
          <svg
            style={{
              transform: 'rotateY(-180deg) rotateZ(-90deg)',
            }}
            className="absolute -top-[32px] -right-[12px] w-[100px] h-[100px]"
          >
            <circle
              r="18"
              cx="40"
              cy="40"
              strokeDasharray={113}
              strokeDashoffset={0}
              strokeWidth={4}
              stroke="var(--primary)"
              fill="none"
              className="animate-countdown"
            ></circle>
          </svg>
        </div>
        <span className="font-roboto text-sm tracking-loosest">
          Returning to home screen
        </span>
      </div>
      <div className="mt-6 px-4 flex flex-col items-center gap-8">
        <h1 className="text-4xl leading-[2.75rem] font-normal text-dark-gray tracking-normal">
          {invalidMeeting ? 'Check your meeting code' : 'You left the meeting'}
        </h1>
        {invalidMeeting && (
          <div className="font-roboto text-base text-meet-gray text-center">
            <p>
              Make sure you entered the correct meeting code in the URL, for
              example:{' '}
            </p>
            <p>
              https://{window.location.host}/
              <span className="font-extrabold">xxx-yyyy-zzz</span>
              <a href="#" className="ml-2 text-primary">
                Learn more
              </a>
            </p>
          </div>
        )}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-2">
            {!invalidMeeting && (
              <PlainButton
                size="sm"
                className="border border-hairline-gray px-[23px] shadow-[border_.28s_cubic-bezier(.4,0,.2,1),box-shadow_.28s_cubic-bezier(.4,0,.2,1)]"
                onClick={rejoinMeeting}
              >
                Rejoin
              </PlainButton>
            )}
            <Button size="sm" onClick={returnHome}>
              Return to home screen
            </Button>
          </div>
          <PlainButton size="sm">Submit feedback</PlainButton>
        </div>
        <div className="max-w-100 flex flex-wrap flex-col rounded items-center pl-4 pr-3 pt-4 pb-1 border border-hairline-gray text-left">
          <div className="flex items-center">
            <Image
              alt="Your meeting is safe"
              width={58}
              height={58}
              src="https://www.gstatic.com/meet/security_shield_356739b7c38934eec8fb0c8e93de8543.svg"
            />
            <div className="pl-4">
              <h2 className="text-meet-black text-lg leading-6 tracking-normal font-normal">
                Your meeting is safe
              </h2>
              <div className="font-roboto text-sm text-meet-gray tracking-loosest">
                No one can join a meeting unless invited or admitted by the host
              </div>
            </div>
          </div>
          <div className="pt-2 w-full flex grow justify-end whitespace-nowrap">
            <PlainButton size="sm">Learn more</PlainButton>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src="https://www.gstatic.com/meet/sounds/leave_call_bfab46cf473a2e5d474c1b71ccf843a1.ogg"
      />
    </div>
  );
};

export default MeetingEnd;
