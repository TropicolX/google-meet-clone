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
  SpeechIndicator,
  ToggleMenuButtonProps,
  useCall,
  useCallStateHooks,
  useParticipantViewContext,
} from '@stream-io/video-react-sdk';
import clsx from 'clsx';

export const speechRingClassName = 'speech-ring';

const ParticipantViewUI = () => {
  const [showMenu, setShowMenu] = useState(false);
  const call = useCall();
  const { useHasPermissions } = useCallStateHooks();
  const { participant, trackType } = useParticipantViewContext();
  const { pin, sessionId, isLocalParticipant, isSpeaking, userId } =
    participant;
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

  if (
    isLocalParticipant &&
    isScreenSharing &&
    trackType === 'screenShareTrack'
  ) {
    return (
      <>
        <DefaultScreenShareOverlay />
        <ParticipantDetails />
      </>
    );
  }

  return (
    <>
      <ParticipantDetails />
      {hasAudioTrack && (
        <div className="absolute top-[.875rem] right-[.875rem] w-[26px] h-[26px] flex items-center justify-center bg-[#1a73e8] rounded-full">
          <SpeechIndicator />
        </div>
      )}
      {!hasAudioTrack && (
        <div className="absolute top-[.875rem] right-[.875rem] w-[26px] h-[26px] flex items-center justify-center bg-[#2021244d] rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 0 24 24"
            width="18px"
            fill="#fff"
          >
            <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none" />
            <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z" />
          </svg>
        </div>
      )}
      {
        <div
          className={clsx(
            isSpeaking &&
              hasAudioTrack &&
              'ring-[5px] ring-inset ring-[#659df6]',
            `absolute left-0 top-0 w-full h-full rounded-[12px] ${speechRingClassName}`
          )}
        />
      }
      <div
        onMouseOver={() => {
          setShowMenu(true);
        }}
        onMouseOut={() => setShowMenu(false)}
        className="absolute z-[1] left-0 top-0 w-full h-full bg-transparent"
      />
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
              placement={'bottom-start'}
              ToggleButton={PinMenuToggleButton}
            >
              <ParticipantActionsContextMenu />
            </MenuToggle>
          )}
          {pinned && (
            <Button
              onClick={unpin}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#fff"
                >
                  <path d="M688.13-853.15v91h-40v325.56L322.57-762.15l-50.7-50.7v-40.3h416.26ZM480-32.59l-45.5-45.5v-239.04H231.87v-91.24l80-80v-46.72L45.72-803.48l58.63-58.39L854.22-112l-60.15 58.63L530.3-317.13l-4.8.48v238.56L480-32.59Z" />
                </svg>
              }
            />
          )}
        </div>
        <Button
          icon={
            <i aria-hidden="true" className="google-symbols">
              visual_effects
            </i>
          }
        />
        <div className="[&_ul>*:nth-child(-n+3)]:hidden">
          <MenuToggle
            strategy="fixed"
            placement={'bottom-start'}
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
        {pinned &&
          (pin.isLocalPin ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path d="m648.13-488.37 80 80v91.24H525.5v239.04L480-32.59l-45.5-45.5v-239.04H231.87v-91.24l80-80v-273.78h-40v-91h416.26v91h-40v273.78Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#fff"
            >
              <path d="m360-32.59-45.5-45.5v-239.04H111.87v-91.24l80-80v-273.78h-40v-91h290.26q-41.24 40-63.12 91.5-21.88 51.5-21.88 108.5 0 108.82 72.21 187.56 72.2 78.74 178.79 90.15v58.31H405.5v239.04L360-32.59Zm277.13-420.56q-83 0-141.5-58.5t-58.5-141.5q0-83 58.5-141.5t141.5-58.5q83 0 141.5 58.5t58.5 141.5q0 83-58.5 141.5t-141.5 58.5Zm0-200q25 0 42.5-17.5t17.5-42.5q0-25-17.5-42.5t-42.5-17.5q-25 0-42.5 17.5t-17.5 42.5q0 25 17.5 42.5t42.5 17.5Zm0 120q30.76 0 56.38-14.38t42.62-38.69q-22.24-13.17-47.24-20.05-25-6.88-51.76-6.88-26.76 0-51.76 6.88-25 6.88-47.24 20.05 17 24.31 42.62 38.69 25.62 14.38 56.38 14.38Z" />
            </svg>
          ))}
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
  return (
    <Button
      {...props}
      ref={ref}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
        >
          <path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z" />
        </svg>
      }
    />
  );
});

const OtherMenuToggleButton = forwardRef<
  HTMLButtonElement,
  ToggleMenuButtonProps
>(function ToggleButton(props, ref) {
  return (
    <Button
      {...props}
      ref={ref}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
        >
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </svg>
      }
    />
  );
});

export default ParticipantViewUI;
