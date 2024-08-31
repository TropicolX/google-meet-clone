import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { createContext, useState } from 'react';

type MeetContextType = {
  client: StreamVideoClient | undefined;
  setClient: (client: StreamVideoClient) => void;
  call: Call | undefined;
  setCall: (call: Call | undefined) => void;
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
};

export const MeetContext = createContext<MeetContextType>(initialContext);

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlciJ9.HgrSSLZbSd95N0CflhNQ5LxAyrTtxi0zu4r-PePIKpg';
const token2 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcjEifQ.IetiVuMVjDO5uXVqNSfxQb06ztTEXF3PQalqWlULBSU';

const MeetProvider = ({ meetingId, children }: MeetProviderProps) => {
  const user = { id: 'user1' };
  const [client, setClient] = useState<StreamVideoClient>(
    new StreamVideoClient({ apiKey, user, token: token2 })
  );
  const [call, setCall] = useState<Call | undefined>(
    client.call('default', meetingId)
  );

  // useEffect(() => {
  //   return () => {
  //     client.disconnectUser();

  //     if (call?.state.callingState !== CallingState.LEFT) {
  //       call?.leave();
  //     }
  //   };
  // }, [client, call, meetingId]);

  return (
    <MeetContext.Provider
      value={{
        client,
        setClient,
        call,
        setCall,
      }}
    >
      <StreamVideo client={client}>
        <StreamCall call={call}>{children}</StreamCall>
      </StreamVideo>
    </MeetContext.Provider>
  );
};

export default MeetProvider;
