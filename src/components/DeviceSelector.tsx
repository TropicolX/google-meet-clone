import { ReactNode } from 'react';
import { useCallStateHooks } from '@stream-io/video-react-sdk';

import Dropdown from './Dropdown';
import Mic from './icons/Mic';
import Videocam from './icons/Videocam';
import VolumeUp from './icons/VolumeUp';

type DeviceSelectorProps = {
  devices: MediaDeviceInfo[] | undefined;
  selectedDeviceId?: string;
  onSelect: (deviceId: string) => void;
  icon: ReactNode;
  disabled?: boolean;
  className?: string;
  dark?: boolean;
};

type SelectorProps = {
  disabled?: boolean;
  className?: string;
  dark?: boolean;
};

export const DeviceSelector = ({
  devices,
  selectedDeviceId,
  onSelect,
  icon,
  disabled = false,
  className = '',
  dark = false,
}: DeviceSelectorProps) => {
  const label =
    devices?.find((device) => device.deviceId === selectedDeviceId)?.label! ||
    'Default - ...';

  return (
    <Dropdown
      label={disabled ? 'Permission needed' : label}
      value={selectedDeviceId}
      icon={icon}
      onChange={(value) => onSelect(value)}
      options={
        devices?.map((device) => ({
          label: device.label,
          value: device.deviceId,
        }))!
      }
      disabled={disabled}
      className={className}
      dark={dark}
    />
  );
};

export const AudioInputDeviceSelector = ({
  disabled = false,
  className = '',
  dark,
}: SelectorProps) => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, devices, selectedDevice } = useMicrophoneState();

  return (
    <DeviceSelector
      devices={devices}
      selectedDeviceId={selectedDevice}
      onSelect={(deviceId) => microphone.select(deviceId)}
      icon={<Mic width={20} height={20} color="var(--meet-black)" />}
      disabled={disabled}
      className={className}
      dark={dark}
    />
  );
};

export const VideoInputDeviceSelector = ({
  disabled = false,
  className = '',
  dark = false,
}: SelectorProps) => {
  const { useCameraState } = useCallStateHooks();
  const { camera, devices, selectedDevice } = useCameraState();

  return (
    <DeviceSelector
      devices={devices}
      selectedDeviceId={selectedDevice}
      onSelect={(deviceId) => camera.select(deviceId)}
      icon={<Videocam width={18} height={18} color="var(--meet-black)" />}
      disabled={disabled}
      className={className}
      dark={dark}
    />
  );
};

export const AudioOutputDeviceSelector = ({
  disabled = false,
  className = '',
  dark = false,
}: SelectorProps) => {
  const { useSpeakerState } = useCallStateHooks();
  const { speaker, devices, selectedDevice, isDeviceSelectionSupported } =
    useSpeakerState();

  if (!isDeviceSelectionSupported) return null;

  return (
    <DeviceSelector
      devices={devices}
      selectedDeviceId={
        selectedDevice
          ? selectedDevice
          : devices
          ? devices[0]?.deviceId
          : 'Default - ...'
      }
      onSelect={(deviceId) => speaker.select(deviceId)}
      icon={<VolumeUp width={20} height={20} color="var(--meet-black)" />}
      disabled={disabled}
      className={className}
      dark={dark}
    />
  );
};
