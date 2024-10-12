import { queryService } from '@/api';
import { useSlider } from '@/hooks';
import { createFileUrl, fromNow } from '@/utils';
import { Eye } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

const SLIDER_COUNT = 5;

export function BooksSlider({ params }: Pick<PageProps<'scopeId'>, 'params'>) {
  const items = useSuspenseQuery(
    queryService('library:/v1/scope/{scopeId}/books', {
      params: {
        path: { scopeId: +params.scopeId },
        query: { sort: ['id,desc'], pageable: { size: SLIDER_COUNT } } as any,
      },
    })
  ).data.content!;

  const { sliderButtons } = useSlider({ ids: items.map((item) => item.id!) });

  return (
    <div className="carousel rounded-lg w-full sm:h-60 max-sm:h-96">
      {items.map((item, index) => (
        <div key={item.id} id={`slider-item-${index}`} className="carousel-item w-full">
          <Link href={`./book/${item.id}`} className="flex items-start w-full gap-8 max-sm:flex-col">
            <div className="h-full">
              <img
                src={createFileUrl(item.coverImage, item.fileKey)}
                alt={item.name}
                className="object-cover pointer-events-none rounded-lg h-full"
              />
            </div>
            <div className="px-2 flex flex-col gap-2 w-3/5 h-full">
              <div className="opacity-50 flex gap-3 text-xs font-medium">
                <span className="flex items-center justify-center">{fromNow(item.createdAt!)}</span>

                <span className="flex items-center justify-center">
                  <Eye size={18} color="black" className="ml-1" />
                  {item.downloadCount}
                </span>
              </div>

              <div className="font-lg">{item.name}</div>

              <div className="w-full h-full opacity-75 text-md">{item.description}</div>
              {sliderButtons(index)}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
