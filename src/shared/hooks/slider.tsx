'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

interface Props {
  ids: number[];
}
const SLIDER_COUNT = 5;

export function useSlider({ ids }: Props) {
  function setActiveHero(id: number) {
    document.getElementById(`slider-item-${id}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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
              setActiveHero(id);
            }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    );
  }

  useEffect(() => {
    let index = 0;
    let interval = setTimeout(() => {
      setActiveHero(ids[(index + 1) % SLIDER_COUNT]);
    }, 5000);
    return () => {
      clearTimeout(interval);
    };
  }, []);

  return { setActiveHero, sliderButtons };
}
