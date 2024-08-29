import {
  createSoundDetector,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';

const useSoundDetected = () => {
  const [soundDetected, setSoundDetected] = useState(false);
  const { useMicrophoneState } = useCallStateHooks();
  const { status: microphoneStatus, mediaStream } = useMicrophoneState();

  useEffect(() => {
    if (microphoneStatus !== 'enabled' || !mediaStream) return;

    const disposeSoundDetector = createSoundDetector(
      mediaStream,
      ({ isSoundDetected: sd }) => setSoundDetected(sd),
      { detectionFrequencyInMs: 80, destroyStreamOnStop: false }
    );

    return () => {
      disposeSoundDetector().catch(console.error);
    };
  }, [microphoneStatus, mediaStream]);

  return soundDetected;
};

export default useSoundDetected;
