import { CallParticipantResponse } from '@stream-io/video-react-sdk';

import Avatar from './Avatar';

interface CallParticipantsProps {
  participants: CallParticipantResponse[];
}

const AVATAR_SIZE = 24;

const CallParticipants = ({ participants }: CallParticipantsProps) => {
  const getText = () => {
    if (participants.length === 1) {
      return `${
        participants[0].user.name || participants[0].user.id
      } is in this call`;
    } else {
      // if there are more than 4 then "x, y, z and n - 3 more are in this call"
      // if there are 4 or less then "x ... and y are in this call"
      return (
        participants
          .slice(0, 3)
          .map((p) => p.user.name || p.user.id)
          .join(', ') +
        (participants.length > 4
          ? ` and ${participants.length - 3} more`
          : participants.length === 4
          ? ` and ${participants[3].user.name || participants[3].user.id}`
          : '') +
        ' are in this call'
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        {participants.slice(0, 3).map((p) => (
          <Avatar participant={p} width={AVATAR_SIZE} key={p.user_session_id} />
        ))}
        {participants.length === 4 && (
          <Avatar participant={participants[3]} width={AVATAR_SIZE} />
        )}
        {participants.length > 4 && (
          <Avatar text={`+${participants.length - 3}`} width={AVATAR_SIZE} />
        )}
      </div>
      <span>{getText()}</span>
    </div>
  );
};

export default CallParticipants;
