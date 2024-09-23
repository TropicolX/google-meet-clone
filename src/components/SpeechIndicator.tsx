import clsx from 'clsx';

interface SpeechIndicatorProps {
  isSpeaking: boolean;
  isDominantSpeaker?: boolean;
}

const SpeechIndicator = ({
  isSpeaking,
  isDominantSpeaker = true,
}: SpeechIndicatorProps) => {
  return (
    <span
      className={clsx(
        'str-video__speech-indicator',
        isDominantSpeaker && 'str-video__speech-indicator--dominant',
        isSpeaking && 'str-video__speech-indicator--speaking'
      )}
    >
      <span className="str-video__speech-indicator__bar" />
      <span className="str-video__speech-indicator__bar" />
      <span className="str-video__speech-indicator__bar" />
    </span>
  );
};

export default SpeechIndicator;
