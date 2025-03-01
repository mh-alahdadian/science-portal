import {
  Article,
  Books,
  Buildings,
  ChatCircleText,
  Clock,
  Envelope,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Newspaper,
  Phone,
  TwitterLogo,
  UsersThree,
} from '@phosphor-icons/react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-gradient-to-b from-[#001a41] via-[#00265e] to-[#001a41] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-6 border-b-2 border-blue-400 pb-2">ارتباط با ما</h2>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Phone weight="fill" className="text-blue-400" />
              <span>021-12345678</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Envelope weight="fill" className="text-blue-400" />
              <span>info@example.com</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <MapPin weight="fill" className="text-blue-400" />
              <span>تهران، خیابان ولیعصر، تقاطع شهید بهشتی</span>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Clock weight="fill" className="text-blue-400" />
              <span>شنبه تا پنجشنبه: ۸ صبح تا ۶ عصر</span>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.9627430847677!2d51.41876231526027!3d35.729034980184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0728f1486ee3%3A0x7c3c6a4f5c2b274f!2sValiasr-City%20Theatre%20Junction!5e0!3m2!1sen!2s!4v1629890738564!5m2!1sen!2s"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Services Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-6 border-b-2 border-blue-400 pb-2">سرویس‌ها</h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/news"
                    className="flex items-center hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <Newspaper className="ml-2 group-hover:translate-x-1 transition-transform" />
                    اخبار
                    <span className="mr-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      (آخرین اخبار حوزه شناختی)
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/forum"
                    className="flex items-center hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <ChatCircleText className="ml-2 group-hover:translate-x-1 transition-transform" />
                    انجمن
                    <span className="mr-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      (گفتگوهای تخصصی)
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="flex items-center hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <Article className="ml-2 group-hover:translate-x-1 transition-transform" />
                    بلاگ
                    <span className="mr-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      (مقالات و مطالب)
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/library"
                    className="flex items-center hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <Books className="ml-2 group-hover:translate-x-1 transition-transform" />
                    کتابخانه
                    <span className="mr-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      (منابع آموزشی)
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-6 border-b-2 border-blue-400 pb-2">پورتال‌های شناختی</h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://icss.ac.ir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <Buildings className="ml-2 group-hover:rotate-12 transition-transform" />
                    پژوهشکده علوم شناختی
                    <span className="mr-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      (رسمی)
                    </span>
                  </a>
                </li>
                {/* <li>
                <a
                  href="https://iricss.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-400 transition-colors duration-300 group"
                >
                  <Brain className="ml-2 group-hover:rotate-12 transition-transform" />
                  پژوهشکده نقشه‌برداری مغز
                  <span className="mr-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    (تحقیقاتی)
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://cogscience.ut.ac.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-400 transition-colors duration-300 group"
                >
                  <GraduationCap className="ml-2 group-hover:rotate-12 transition-transform" />
                  مرکز تحقیقات علوم شناختی دانشگاه تهران
                  <span className="mr-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    (دانشگاهی)
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://cogsci.ipm.ac.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-400 transition-colors duration-300 group"
                >
                  <Books className="ml-2 group-hover:rotate-12 transition-transform" />
                  پژوهشکده علوم شناختی IPM
                  <span className="mr-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    (پژوهشی)
                  </span>
                </a>
              </li> */}
                <li>
                  <a
                    href="https://www.iranpa.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <UsersThree className="ml-2 group-hover:rotate-12 transition-transform" />
                    انجمن روانشناسی ایران
                    <span className="mr-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      (انجمن)
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-6 border-b-2 border-blue-400 pb-2">خبرنامه</h2>
            <p className="text-sm">برای دریافت آخرین اخبار و تخفیف‌ها در خبرنامه ما عضو شوید</p>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="px-4 py-2 bg-white/10 rounded-r outline-none flex-1"
              />
              <button className="bg-blue-500 px-6 py-2 rounded-l hover:bg-blue-600 transition-colors duration-300">
                عضویت
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a
                href="https://instagram.com"
                className="hover:text-blue-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramLogo size={24} weight="fill" />
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-blue-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterLogo size={24} weight="fill" />
              </a>
              <a
                href="https://facebook.com"
                className="hover:text-blue-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookLogo size={24} weight="fill" />
              </a>
              <a
                href="https://linkedin.com"
                className="hover:text-blue-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinLogo size={24} weight="fill" />
              </a>
            </div>
            <p className="text-sm text-gray-400">© {currentYear} تمامی حقوق محفوظ است | طراحی و توسعه توسط تیم ما</p>
          </div>
        </div>
      </div>

      {/* Decorative Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#f3f4f6]"
          ></path>
        </svg>
      </div>
    </footer>
  );
};
