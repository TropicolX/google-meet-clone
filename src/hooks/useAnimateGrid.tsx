'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { avatarClassName } from '../components/Avatar';
import {
  menuOverlayClassName,
  speechRingClassName,
} from '../components/ParticipantViewUI';
import { placeholderClassName } from '../components/VideoPlaceholder';

type PreviousValues = Map<
  string,
  {
    x: number;
    y: number;
    width: number;
    height: number;
    total: number;
  }
>;

gsap.registerPlugin(useGSAP);

const useAnimateGrid = () => {
  const previousRef = useRef<PreviousValues>(new Map());
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (!ref.current) return;
      let container = ref.current!.querySelector(
        '.str-video__paginated-grid-layout__group'
      ) as HTMLElement;

      const animateItems = contextSafe!(() => {
        const items = Array.from(
          ref.current!.querySelectorAll('.str-video__participant-view')
        );
        let layout = ref.current!.querySelector(
          '.str-video__paginated-grid-layout'
        ) as HTMLElement;

        items.forEach((item, index) => {
          const { left, top, width, height } = item.getBoundingClientRect();
          const container = layout.getBoundingClientRect();

          const startX = left - container.left;
          const startY = top - container.top;

          const id = index.toString();
          const prevPosition = previousRef.current.get(id) || {
            x: startX,
            y: startY,
            width,
            height,
            total: items.length,
          };

          // Calculate scale factors
          const scaleX = prevPosition.width / width;
          const scaleY = prevPosition.height / height;

          const getTranslateValues = () => {
            if (items.length === 1) {
              return [-prevPosition.width / 2, 0];
            } else if (
              index === 0 &&
              items.length === 2 &&
              prevPosition.total === 1
            ) {
              return [prevPosition.width / 4, 0];
            } else {
              return [prevPosition.x - startX, prevPosition.y - startY];
            }
          };

          const [x, y] = getTranslateValues();

          const innerFrom = {
            scaleX: 1 / scaleX,
            scaleY: 1 / scaleY,
          };

          // animate element's children
          item
            .querySelectorAll(
              `:scope > :not(video):not(.${menuOverlayClassName}):not(.${placeholderClassName}):not(.${speechRingClassName})`
            )
            .forEach((el) => {
              gsap.fromTo(el, innerFrom, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.5,
                ease: 'power3.inOut',
                onComplete: () => {
                  gsap.set(el, { attr: { style: '' } });
                },
              });
            });

          const video = item.querySelector('video');
          if (!video) {
            const avatar = item.querySelector(`.${avatarClassName}`);
            if (avatar) {
              gsap.fromTo(avatar, innerFrom, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.5,
                ease: 'power3.inOut',
              });
            }
          }

          // animate video cover when there are 3 participants or less
          if (
            items.length < 3 ||
            (items.length === 3 && prevPosition.total === 2)
          ) {
            if (video) {
              gsap.fromTo(
                item.querySelector(`.${menuOverlayClassName}`),
                {
                  background: '#202124',
                  opacity: 1,
                  outlineWidth: 2,
                  outlineStyle: 'solid',
                  outlineColor: '#202124',
                  ...(items.length === 1 && {
                    borderRadius: '0px',
                  }),
                },
                {
                  opacity: 0,
                  outlineWidth: 2,
                  duration: 0.8,
                  ease: 'power2.inOut',
                  onComplete: () => {
                    gsap.set(item.querySelector(`.${menuOverlayClassName}`), {
                      attr: { style: '' },
                    });
                  },
                }
              );
            }
          }

          // animate element
          gsap.fromTo(
            item,
            {
              x,
              y,
              scaleX,
              scaleY,
            },
            {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              duration: 0.5,
              ease: 'power3.inOut',
              onComplete: () => {
                gsap.set(item, { attr: { style: '' } });
              },
            }
          );

          previousRef.current.set(id, {
            x: startX,
            y: startY,
            width,
            height,
            total: items.length,
          });
        });
      });

      // Set up observer to detect changes
      const observer = new MutationObserver(animateItems);
      observer.observe(container, { childList: true });

      // Run the animation observer setup
      animateItems();

      // Cleanup observer on unmount
      return () => {
        if (container) {
          observer.disconnect();
        }
      };
    },
    { scope: ref }
  );

  return { ref };
};

export default useAnimateGrid;
