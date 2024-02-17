import Image from 'next/image';

import Recommendation1 from '../assets/Recommendation1.png';
import Recommendation2 from '../assets/Recommendation2.png';

const content = [
  { banner: Recommendation1, styles: { color: undefined }, title: 'فروم جدید علوم شناختی و AI راه‌اندازی شد' },
  {
    banner: Recommendation2,
    styles: { color: 'white', width: '30%', margin: 'auto auto auto 0' },
    title: 'کتاب‌خانه روان‌شناسی ارتقا یافت',
  },
];

export default function Recommendations() {
  return (
    <div className="flex gap-6">
      {content.map((x, index) => (
        <div key={index} className="card image-full cursor-pointer rounded-lg">
          <figure>
            <Image src={x.banner} alt={x.title} />
          </figure>
          <p className="card-body card-title" style={x.styles}>
            {x.title}
          </p>
        </div>
      ))}
    </div>
  );
}
