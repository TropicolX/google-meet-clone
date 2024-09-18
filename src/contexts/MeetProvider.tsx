import { createContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from '@stream-io/video-react-sdk';
import LoadingOverlay from '../components/LoadingOverlay';
import { User as ChatUser } from 'stream-chat';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';

type MeetContextType = {
  chatClient: StreamChat | undefined;
  setChatClient: (client: StreamChat) => void;
  videoClient: StreamVideoClient | undefined;
  setVideoClient: (client: StreamVideoClient) => void;
  call: Call | undefined;
  setCall: (call: Call | undefined) => void;
  user: User | undefined;
};

type MeetProviderProps = {
  meetingId: string;
  children: React.ReactNode;
};

const initialContext: MeetContextType = {
  chatClient: undefined,
  videoClient: undefined,
  call: undefined,
  setVideoClient: () => {},
  setChatClient: () => {},
  setCall: () => {},
  user: undefined,
};

export const MeetContext = createContext<MeetContextType>(initialContext);
export const CALL_TYPE = 'default';
export const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;

const MeetProvider = ({ meetingId, children }: MeetProviderProps) => {
  const [loading, setLoading] = useState(true);
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const [user, setUser] = useState<User>();
  const [chatClient, setChatClient] = useState<StreamChat>();
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    if (!isLoaded) return;

    const tokenProvider = async () => {
      const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: clerkUser?.id }),
      });
      const data = await response.json();
      return data.token;
    };

    const setUpChat = async (user: ChatUser) => {
      const _chatClient = StreamChat.getInstance(API_KEY);
      await _chatClient.connectUser(user, tokenProvider);
      setChatClient(_chatClient);
      setLoading(false);
    };

    let user: User | ChatUser;
    if (isSignedIn) {
      user = {
        id: clerkUser.id,
        name: clerkUser.fullName!,
        image: clerkUser.hasImage ? clerkUser.imageUrl : undefined,
        custom: {
          username: clerkUser?.username,
        },
      };
    } else {
      user = {
        id: 'guest',
        type: 'guest',
        name: 'Guest',
      };
    }

    const _videoClient = new StreamVideoClient({
      apiKey: API_KEY,
      user,
      tokenProvider,
    });
    const call = _videoClient.call(CALL_TYPE, meetingId);

    setUser(user);
    setVideoClient(_videoClient);
    setCall(call);
    setUpChat(user);

    return () => {
      _videoClient.disconnectUser();
    };
  }, [clerkUser, isLoaded, isSignedIn, loading, meetingId]);

  if (loading) return <LoadingOverlay />;

  return (
    <MeetContext.Provider
      value={{
        chatClient,
        setChatClient,
        videoClient,
        setVideoClient,
        call,
        setCall,
        user,
      }}
    >
      <Chat client={chatClient!}>
        <StreamVideo client={videoClient!}>
          <StreamCall call={call}>{children}</StreamCall>
        </StreamVideo>
      </Chat>
    </MeetContext.Provider>
  );
};

export default MeetProvider;
