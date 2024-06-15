import { TextIcon } from '@/components';
import { ArrowLeft, Eye } from '@phosphor-icons/react';
import humanFormat from 'human-format';
import Link from 'next/link';

const mockPosts: (Schema<'ArticleResponseDTO'> & { view: number })[] = [
  {
    id: 1,
    title: 'عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد. عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد.',
    authorId: 4851,
    authorName: 'نویسنده بلاگ',
    coverImage:
      'https://s3-alpha-sig.figma.com/img/a2e5/b041/399e46ec81cd011be4a42a4561c2de39?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H75LXp4mpoPlTgON8VfRMLqtmpNqMWQ6Ixrlw2Zdd67S~7zcgRc3h1bV3JHwrSdWcwMDKdapEK9tzWem~zRYEAHFrE5xUO-tHI0zbd4TEvUBNnUloqRTnrgQdcFb2~TwgomhU3VBbqE3tAR5~DHLDXcwPWcREXxVDhEuDVOp6jw6kXMOAhKQs6Nj3OKclrhOtB5lcFw~VOSWQevaxT-j47SUkP0nC4354QIIFGvOhLFOTWN1xxPkGipQmt6lGXZWSUBSaFouP71zg9-qK-RgOHlcru1KhaKPzDWvSKHQJpu5zP6nKbHXEpY~RFXjmJy6GTfkvYpW5JsoRcFVLQbfqA__',
    view: 125000,
  },
  {
    id: 2,
    title: 'عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد. عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد.',
    authorId: 4851,
    authorName: 'نویسنده بلاگ',
    coverImage:
      'https://s3-alpha-sig.figma.com/img/a2e5/b041/399e46ec81cd011be4a42a4561c2de39?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H75LXp4mpoPlTgON8VfRMLqtmpNqMWQ6Ixrlw2Zdd67S~7zcgRc3h1bV3JHwrSdWcwMDKdapEK9tzWem~zRYEAHFrE5xUO-tHI0zbd4TEvUBNnUloqRTnrgQdcFb2~TwgomhU3VBbqE3tAR5~DHLDXcwPWcREXxVDhEuDVOp6jw6kXMOAhKQs6Nj3OKclrhOtB5lcFw~VOSWQevaxT-j47SUkP0nC4354QIIFGvOhLFOTWN1xxPkGipQmt6lGXZWSUBSaFouP71zg9-qK-RgOHlcru1KhaKPzDWvSKHQJpu5zP6nKbHXEpY~RFXjmJy6GTfkvYpW5JsoRcFVLQbfqA__',
    view: 125000,
  },
];

export function PostRows(props: {}) {
  const posts = mockPosts;
  return (
    <ol className="flex flex-col gap-4">
      {posts.map((post, i) => (
        <li className="flex items-center gap-4" key={i}>
          <div className="avatar placeholder">
            <div className="w-20 rounded-lg">
              <img src={post.coverImage} alt="test image" />
            </div>
          </div>
          <div>
            <Link className="flex" href={`blog/${post.id}`}>
              <p>{post.title}</p>
              <ArrowLeft className="shrink-0" size={24} />
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <p>{post.authorName}</p>
              <TextIcon Icon={Eye} text={humanFormat(post.view)} />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
