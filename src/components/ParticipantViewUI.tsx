import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useState,
} from 'react';
import {
  DefaultParticipantViewUIProps,
  DefaultScreenShareOverlay,
  hasAudio,
  hasScreenShare,
  MenuToggle,
  OwnCapability,
  ParticipantActionsContextMenu,
  ToggleMenuButtonProps,
  useCall,
  useCallStateHooks,
  useParticipantViewContext,
} from '@stream-io/video-react-sdk';
import clsx from 'clsx';

import Keep from './icons/Keep';
import KeepFilled from './icons/KeepFilled';
import KeepOffFilled from './icons/KeepOffFilled';
import KeepPublicFilled from './icons/KeepPublicFilled';
import MicOffFilled from './icons/MicOffFilled';
import SpeechIndicator from './SpeechIndicator';
import VisualEffects from './icons/VisualEffects';
import MoreVert from './icons/MoreVert';

export const speechRingClassName = 'speech-ring';
export const menuOverlayClassName = 'menu-overlay';

const ParticipantViewUI = () => {
  const call = useCall();
  const { useHasPermissions } = useCallStateHooks();
  const { participant, trackType } = useParticipantViewContext();
  const [showMenu, setShowMenu] = useState(false);

  const {
    pin,
    sessionId,
    isLocalParticipant,
    isSpeaking,
    isDominantSpeaker,
    userId,
  } = participant;
  const isScreenSharing = hasScreenShare(participant);
  const hasAudioTrack = hasAudio(participant);
  const canUnpinForEveryone = useHasPermissions(OwnCapability.PIN_FOR_EVERYONE);
  const pinned = !!pin;

  const unpin = () => {
    if (pin?.isLocalPin || !canUnpinForEveryone) {
      call?.unpin(sessionId);
    } else {
      call?.unpinForEveryone({
        user_id: userId,
        session_id: sessionId,
      });
    }
  };

  if (isLocalParticipant && isScreenSharing && trackType === 'screenShareTrack')
    return (
      <>
        <DefaultScreenShareOverlay />
        <ParticipantDetails />
      </>
    );

  return (
    <>
      <ParticipantDetails />
      {hasAudioTrack && (
        <div className="absolute top-[.875rem] right-[.875rem] w-[26px] h-[26px] flex items-center justify-center bg-[#1a73e8] rounded-full">
          <SpeechIndicator
            isSpeaking={isSpeaking}
            isDominantSpeaker={isDominantSpeaker}
          />
        </div>
      )}
      {!hasAudioTrack && (
        <div className="absolute top-[.875rem] right-[.875rem] w-[26px] h-[26px] flex items-center justify-center bg-[#2021244d] rounded-full">
          <MicOffFilled width={18} height={18} />
        </div>
      )}
      {/* Speech Ring */}
      <div
        className={clsx(
          isSpeaking && hasAudioTrack && 'ring-[5px] ring-inset ring-[#659df6]',
          `absolute left-0 top-0 w-full h-full rounded-[12px] ${speechRingClassName}`
        )}
      />
      {/* Menu Overlay */}
      <div
        onMouseOver={() => {
          setShowMenu(true);
        }}
        onMouseOut={() => setShowMenu(false)}
        className={`absolute z-[1] left-0 top-0 w-full h-full rounded-[12px] bg-transparent ${menuOverlayClassName}`}
      />
      {/* Menu */}
      <div
        className={clsx(
          showMenu ? 'opacity-60' : 'opacity-0',
          'absolute left-[calc(50%-66px)] top-[calc(50%-22px)] flex items-center justify-center z-[1] h-[44px] transition-opacity duration-[.3s] ease-linear overflow-hidden',
          'shadow-[0_1px_2px_0px_rgba(0,0,0,0.3),_0_1px_3px_1px_rgba(0,0,0,.15)] bg-[#202124] rounded-[44px] h-[44px] hover:opacity-90'
        )}
      >
        <div className="[&_ul>*:nth-child(n+4)]:hidden">
          {!pinned && (
            <MenuToggle
              strategy="fixed"
              placement="bottom-start"
              ToggleButton={PinMenuToggleButton}
            >
              <ParticipantActionsContextMenu />
            </MenuToggle>
          )}
          {pinned && <Button onClick={unpin} icon={<KeepOffFilled />} />}
        </div>
        <Button icon={<VisualEffects />} />
        <div className="[&_ul>*:nth-child(-n+3)]:hidden">
          <MenuToggle
            strategy="fixed"
            placement="bottom-start"
            ToggleButton={OtherMenuToggleButton}
          >
            <ParticipantActionsContextMenu />
          </MenuToggle>
        </div>
      </div>
    </>
  );
};

const ParticipantDetails = ({}: Pick<
  DefaultParticipantViewUIProps,
  'indicatorsVisible'
>) => {
  const { participant } = useParticipantViewContext();
  const { pin, name, userId } = participant;
  const pinned = !!pin;

  return (
    <>
      <div className="z-[1] absolute truncate font-medium leading-[1.25rem] cursor-default select-none left-0 bottom-[.65rem] flex items-center justify-start gap-4 max-w-[23.5rem] h-fit text-white text-[.875rem] m-[.375rem_1rem_0rem]">
        {pinned && (pin.isLocalPin ? <KeepFilled /> : <KeepPublicFilled />)}
        <span
          style={{
            textShadow: '0 1px 2px rgba(0,0,0,.6), 0 0 2px rgba(0,0,0,.3)',
          }}
        >
          {name || userId}
        </span>
      </div>
    </>
  );
};

const Button = forwardRef(function Button(
  {
    icon,
    onClick = () => null,
    menuShown,
    ...rest
  }: {
    icon: ReactNode;
    onClick?: () => void;
  } & ComponentProps<'button'> & { menuShown?: boolean },
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
      {...rest}
      ref={ref}
      className="h-[44px] w-[44px] rounded-full p-2.5 bg-transparent border-transparent outline-none hover:bg-[rgba(232,234,237,.15)] transition-[background] duration-[.15s] ease-linear"
    >
      {icon}
    </button>
  );
});

const PinMenuToggleButton = forwardRef<
  HTMLButtonElement,
  ToggleMenuButtonProps
>(function ToggleButton(props, ref) {
  return <Button {...props} ref={ref} icon={<Keep />} />;
});

const OtherMenuToggleButton = forwardRef<
  HTMLButtonElement,
  ToggleMenuButtonProps
>(function ToggleButton(props, ref) {
  return <Button {...props} ref={ref} icon={<MoreVert />} />;
});

export default ParticipantViewUI;
