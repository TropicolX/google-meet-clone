'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Button from '../components/Button';
import ButtonWithIcon from '../components/ButtonWithIcon';
import Header from '../components/Header';
import PlainButton from '../components/PlainButton';
import TextField from '../components/TextField';
import Videocall from '../components/icons/Videocall';

const Home = () => {
  // Features
  // - Authentication
  // - Joining a meeting with a room id
  // - Starting an instant meeting functionality
  // - Real-time meeting room (call lobby)
  // - Screen sharing
  // - Chatting functionality

  const [code, setCode] = useState('');
  const router = useRouter();
  const signedIn = true;

  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[39rem] p-4 pt-[28px] text-center inline-flex flex-col items-center basis-auto shrink-0">
          <h1 className="font-['Google_Sans'] text-[2.812rem] leading-[3.25rem] tracking-normal text-[#1f1f1f] pb-2">
            Video calls and meetings for everyone
          </h1>
          <p className="text-[1.375rem] leading-[1.75rem] text-[#444746] pb-[2rem]">
            Connect, collaborate, and celebrate from anywhere with Moogle Meet
          </p>
        </div>
        <div className="w-full max-w-[38rem] flex justify-center">
          <div className="flex flex-col items-start sm:flex-row gap-6 sm:gap-2 sm:items-center justify-center">
            {signedIn && (
              <ButtonWithIcon icon={<Videocall />}>New meeting</ButtonWithIcon>
            )}
            {!signedIn && <Button size="sm">Sign in</Button>}
            <div className="flex items-center gap-2 sm:ml-4">
              <TextField
                label="Code or link"
                name="code"
                placeholder="Enter a code or link"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <PlainButton
                onClick={() => router.push(`/${code}`)}
                disabled={!code}
              >
                Join
              </PlainButton>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[38rem] mx-auto border-b-[1px] border-b-[#747775] self-stretch mt-8 mb-20" />
        <div className="flex flex-col items-center justify-center gap-8">
          <Image
            src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
            alt="Get a link you can share"
            width={248}
            height={248}
          />
          <div className="flex flex-col gap-2 text-center max-w-[362px]">
            <h2 className="text-[1.5rem] leading-[2rem] tracking-normal text-[#000000DE]">
              Get a link you can share
            </h2>
            <p className="font-[Roboto] text-[.875rem] leading-[1.25rem] text-[#000000DE] pb-[2rem] grow">
              Click <span className="font-bold">New meeting</span> to get a link
              you can send to people you want to meet with
            </p>
          </div>
        </div>
        <footer className="w-full max-w-[38rem] mt-20 pb-4 text-start">
          <div className="text-[.75rem] leading-[1rem] text-[#444746] tracking-[.006rem]">
            <span className="cursor-pointer">
              <a className="text-[#0b57d0] hover:underline" href="#">
                Learn more
              </a>{' '}
              about Moogle Meet
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
