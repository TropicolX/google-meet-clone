import { CallParticipantResponse } from '@stream-io/video-react-sdk';
import Avatar from './Avatar';

interface CallParticipantsProps {
  participants: CallParticipantResponse[];
}

const CallParticipants = ({ participants }: CallParticipantsProps) => {
  const getText = () => {
    if (participants.length === 1) {
      return `${
        participants[0].user.name || participants[0].user.id
      } is in this call`;
    } else {
      // if there are more than 4 then x, y, z and 2 others are in this call
      // if there are 4 or less then x, y, z and a are in this call
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
          <Avatar participant={p} width={24} key={p.user.id} />
        ))}
        {participants.length === 4 && (
          <Avatar participant={participants[3]} width={24} />
        )}
        {participants.length > 4 && (
          <Avatar text={`+${participants.length - 3}`} width={24} />
        )}
      </div>
      <span>{getText()}</span>
    </div>
  );
};

export default CallParticipants;
