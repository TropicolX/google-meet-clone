import { useCallStateHooks } from '@stream-io/video-react-sdk';
import Dropdown from './Dropdown';
import { ReactNode } from 'react';

type DeviceSelectorProps = {
  devices: MediaDeviceInfo[] | undefined;
  selectedDeviceId?: string;
  onSelect: (deviceId: string) => void;
  icon: ReactNode;
  disabled?: boolean;
};

type SelectorProps = {
  disabled?: boolean;
};

export const DeviceSelector = ({
  devices,
  selectedDeviceId,
  onSelect,
  icon,
  disabled = false,
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
    />
  );
};

export const AudioInputDeviceSelector = ({
  disabled = false,
}: SelectorProps) => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, devices, selectedDevice } = useMicrophoneState();

  return (
    <DeviceSelector
      devices={devices}
      selectedDeviceId={selectedDevice}
      onSelect={(deviceId) => microphone.select(deviceId)}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#202124"
        >
          <path d="M480-384q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-36 480v-99q-98.8-13.1-163.4-87.05Q216-404 216-504h72q0 79.68 56.23 135.84 56.22 56.16 136 56.16Q560-312 616-368.16q56-56.16 56-135.84h72q0 100-64.6 173.95Q614.8-256.1 516-243v99h-72Zm36-312q20.4 0 34.2-13.8Q528-483.6 528-504v-240q0-20.4-13.8-34.2Q500.4-792 480-792q-20.4 0-34.2 13.8Q432-764.4 432-744v240q0 20.4 13.8 34.2Q459.6-456 480-456Z" />
        </svg>
      }
      disabled={disabled}
    />
  );
};

export const VideoInputDeviceSelector = ({
  disabled = false,
}: SelectorProps) => {
  const { useCameraState } = useCallStateHooks();
  const { camera, devices, selectedDevice } = useCameraState();

  return (
    <DeviceSelector
      devices={devices}
      selectedDeviceId={selectedDevice}
      onSelect={(deviceId) => camera.select(deviceId)}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="#202124"
        >
          <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" />
        </svg>
      }
      disabled={disabled}
    />
  );
};

export const AudioOutputDeviceSelector = ({
  disabled = false,
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
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#e8eaed"
        >
          <path d="M552-152v-75q86-23 139-93.26 53-70.25 53-159.5 0-89.24-53.5-158.74Q637-708 552-734v-75q116 25 190 117t74 211q0 119-73.5 211.5T552-152ZM144-385v-192h144l192-192v576L288-385H144Zm408 55v-302q45.12 20.4 70.56 61.2Q648-530 648-480.52q0 48.52-25.44 89.23Q597.12-350.59 552-330ZM408-595l-90 90H216v48h102l90 90v-228Zm-91 113Z" />
        </svg>
      }
      disabled={disabled}
    />
  );
};
