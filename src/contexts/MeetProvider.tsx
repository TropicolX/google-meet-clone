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

type MeetContextType = {
  client: StreamVideoClient | undefined;
  setClient: (client: StreamVideoClient) => void;
  call: Call | undefined;
  setCall: (call: Call | undefined) => void;
  user: User | undefined;
};

type MeetProviderProps = {
  meetingId: string;
  children: React.ReactNode;
};

const initialContext: MeetContextType = {
  client: undefined,
  call: undefined,
  setClient: () => {},
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
  const [client, setClient] = useState<StreamVideoClient>();
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

    let user: User;

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

    const myClient = new StreamVideoClient({
      apiKey: API_KEY,
      user,
      tokenProvider,
    });
    const call = myClient.call(CALL_TYPE, meetingId);
    setUser(user);
    setClient(myClient);
    setCall(call);
    setLoading(false);

    return () => {
      myClient.disconnectUser();
    };
  }, [clerkUser, isLoaded, isSignedIn, loading, meetingId]);

  if (loading) return <LoadingOverlay />;

  return (
    <MeetContext.Provider
      value={{
        client,
        setClient,
        call,
        setCall,
        user,
      }}
    >
      <StreamVideo client={client!}>
        <StreamCall call={call}>{children}</StreamCall>
      </StreamVideo>
    </MeetContext.Provider>
  );
};

export default MeetProvider;
