import { FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react';

export function Footer() {
  return (
    <footer
      className="mt-16 h-96 text-white flex justify-around py-24"
      style={{ background: 'linear-gradient(to bottom, #001a41 10%, #00265e 10%, #00265e 90%, #001a41 90%)' }}
    >
      <div className="flex flex-col">
        <h2 className="text-lg font-bold mb-4">ارتباط با ما</h2>
        <ul>
          <li className="mb-2">تلفن: 021-12345678</li>
          <li className="mb-2">فکس: 021-98765432</li>
          <li className="mb-2">ایمیل: info@example.com</li>
        </ul>
        <p className="mt-4">آدرس: تهران، خیابان ولیعصر، تقاطع شهید بهشتی</p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-bold mb-4">درباره ما</h2>
        <ul>
          <li className="mb-2">
            <a href="/about" className="hover:text-gray-300">
              درباره شرکت
            </a>
          </li>
          <li className="mb-2">
            <a href="/team" className="hover:text-gray-300">
              تیم ما
            </a>
          </li>
          <li className="mb-2">
            <a href="/contact" className="hover:text-gray-300">
              تماس با ما
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-bold mb-4">بخش های دیگر سایت</h2>
        <ul>
          <li className="mb-2">
            <a href="/blog" className="hover:text-gray-300">
              بلاگ
            </a>
          </li>
          <li className="mb-2">
            <a href="/news" className="hover:text-gray-300">
              اخبار
            </a>
          </li>
          <li className="mb-2">
            <a href="/forum" className="hover:text-gray-300">
              انجمن
            </a>
          </li>
        </ul>
        <div className="mt-4 flex justify-start">
          <a href="https://www.instagram.com/cogcenter" target="_blank" rel="noopener noreferrer" className="mr-4">
            <InstagramLogo size={32} weight="fill" />
          </a>
          <a href="https://www.twitter.com/cogcenter" target="_blank" rel="noopener noreferrer" className="mr-4">
            <TwitterLogo size={32} weight="fill" />
          </a>
          <a href="https://www.facebook.com/cogcenter" target="_blank" rel="noopener noreferrer" className="mr-4">
            <FacebookLogo size={32} weight="fill" />
          </a>
          <a href="https://www.linkedin.com/cogcenter" target="_blank" rel="noopener noreferrer" className="mr-4">
            <LinkedinLogo size={32} weight="fill" />
          </a>
        </div>
      </div>
    </footer>
  );
}
