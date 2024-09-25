import { useEffect, useState } from 'react';
import {
  combineComparators,
  Comparator,
  hasScreenShare,
  ParticipantView,
  pinned,
  screenSharing,
  StreamVideoParticipant,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import ParticipantViewUI from './ParticipantViewUI';
import useAnimateVideoLayout from '../hooks/useAnimateVideoLayout';
import VideoPlaceholder from './VideoPlaceholder';

const SpeakerLayout = () => {
  const call = useCall();
  const { useParticipants } = useCallStateHooks();
  const { ref } = useAnimateVideoLayout(true);
  const participants = useParticipants();

  const [participantInSpotlight, ...otherParticipants] = participants;
  const [participantsBar, setParticipantsBar] = useState<HTMLDivElement | null>(
    null
  );

  const getCustomSortingPreset = (): Comparator<StreamVideoParticipant> => {
    return combineComparators(screenSharing, pinned);
  };

  useEffect(() => {
    if (!call) return;
    const customSortingPreset = getCustomSortingPreset();
    call.setSortParticipantsBy(customSortingPreset);
  }, [call]);

  useEffect(() => {
    if (!participantsBar || !call) return;

    const cleanup = call.dynascaleManager.setViewport(participantsBar);

    return () => cleanup();
  }, [participantsBar, call]);

  return (
    <div
      ref={ref}
      className="w-full relative overflow-hidden str-video__speaker-layout str-video__speaker-layout--variant-bottom"
    >
      <div className="str-video__speaker-layout__wrapper">
        <div
          className={
            participants.length > 1
              ? 'str-video__speaker-layout__spotlight'
              : 'spotlight--one'
          }
        >
          {call && participantInSpotlight && (
            <ParticipantView
              participant={participantInSpotlight}
              trackType={
                hasScreenShare(participantInSpotlight)
                  ? 'screenShareTrack'
                  : 'videoTrack'
              }
              ParticipantViewUI={ParticipantViewUI}
              VideoPlaceholder={VideoPlaceholder}
            />
          )}
        </div>
        {call && otherParticipants.length > 0 && (
          <div className="str-video__speaker-layout__participants-bar-buttons-wrapper">
            <div className="str-video__speaker-layout__participants-bar-wrapper">
              <div
                ref={setParticipantsBar}
                className="str-video__speaker-layout__participants-bar"
              >
                {otherParticipants.map((participant) => (
                  <div
                    key={participant.sessionId}
                    className="str-video__speaker-layout__participant-tile"
                  >
                    <ParticipantView
                      participant={participant}
                      ParticipantViewUI={ParticipantViewUI}
                      VideoPlaceholder={VideoPlaceholder}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakerLayout;
