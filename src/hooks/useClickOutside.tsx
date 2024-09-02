import { useEffect, useRef } from 'react';

const useClickOutside = (handler: () => void, shallow?: boolean) => {
  let domNode = useRef<HTMLElement>(null);

  useEffect(() => {
    let maybeHandler = (event: MouseEvent) => {
      if (
        !domNode.current!.contains(event.target as HTMLElement) &&
        (shallow
          ? !domNode.current!.parentElement?.contains(
              event.target as HTMLElement
            )
          : true)
      ) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};

export default useClickOutside;
