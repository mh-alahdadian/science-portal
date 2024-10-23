'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

interface Props {
  ids: number[];
}

export function useSlider({ ids }: Props) {
  function setActiveHero(indexOrNext: number | 'next') {
    const carousel = document.querySelector(`.carousel`)!;
    const currentIndex = (-carousel.scrollLeft / carousel.scrollWidth) * ids.length;
    if (indexOrNext === 'next') {
      indexOrNext = (currentIndex + 1) % ids.length;
    }
    carousel.scrollLeft -= carousel.clientWidth * (indexOrNext - currentIndex);
  }

  function sliderButtons(pIndex: number) {
    return (
      <div className="mt-auto flex w-full justify-center gap-2 py-2">
        {ids.map((id, index) => (
          <span
            className={clsx('btn btn-xs', pIndex === index ? 'text-[darkorange]' : '')}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveHero(index);
            }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    );
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setActiveHero('next');
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return { setActiveHero, sliderButtons };
}
