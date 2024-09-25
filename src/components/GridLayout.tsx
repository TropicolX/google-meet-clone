import { useEffect, useMemo, useState } from 'react';
import {
  combineComparators,
  Comparator,
  IconButton,
  ParticipantView,
  pinned,
  screenSharing,
  StreamVideoParticipant,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import ParticipantViewUI from './ParticipantViewUI';
import useAnimateVideoLayout from '../hooks/useAnimateVideoLayout';
import VideoPlaceholder from './VideoPlaceholder';

const GROUP_SIZE = 6;

const GridLayout = () => {
  const call = useCall();
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const [page, setPage] = useState(0);

  const { ref } = useAnimateVideoLayout(false);

  const pageCount = useMemo(
    () => Math.ceil(participants.length / GROUP_SIZE),
    [participants]
  );

  const participantGroups = useMemo(() => {
    // divide participants into groups of 6
    const groups = [];
    for (let i = 0; i < participants.length; i += GROUP_SIZE) {
      groups.push(participants.slice(i, i + GROUP_SIZE));
    }

    return groups;
  }, [participants]);

  const selectedGroup = participantGroups[page];

  useEffect(() => {
    if (!call) return;
    const customSortingPreset = getCustomSortingPreset();
    call.setSortParticipantsBy(customSortingPreset);
  }, [call]);

  useEffect(() => {
    if (page > pageCount - 1) {
      setPage(Math.max(0, pageCount - 1));
    }
  }, [page, pageCount]);

  const getCustomSortingPreset = (): Comparator<StreamVideoParticipant> => {
    return combineComparators(screenSharing, pinned);
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'w-full relative overflow-hidden',
        'str-video__paginated-grid-layout'
      )}
    >
      {pageCount > 1 && (
        <IconButton
          icon="caret-left"
          disabled={page === 0}
          onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
        />
      )}
      <div
        className={clsx('str-video__paginated-grid-layout__group', {
          'str-video__paginated-grid-layout--one': selectedGroup.length === 1,
          'str-video__paginated-grid-layout--two-four':
            selectedGroup.length >= 2 && selectedGroup.length <= 4,
          'str-video__paginated-grid-layout--five-nine':
            selectedGroup.length >= 5 && selectedGroup.length <= 9,
        })}
      >
        {call && selectedGroup.length > 0 && (
          <>
            {selectedGroup.map((participant) => (
              <ParticipantView
                participant={participant}
                ParticipantViewUI={ParticipantViewUI}
                VideoPlaceholder={VideoPlaceholder}
                key={participant.sessionId}
              />
            ))}
          </>
        )}
      </div>
      {pageCount > 1 && (
        <IconButton
          disabled={page === pageCount - 1}
          icon="caret-right"
          onClick={() =>
            setPage((currentPage) => Math.min(pageCount - 1, currentPage + 1))
          }
        />
      )}
    </div>
  );
};

export default GridLayout;
