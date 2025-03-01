import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname()
  let obj = {
    '/admin/library/': 'داشبورد',
    '/admin/library/categories': 'مدیریت دسته‌ بندی',
    '/admin/library/addBook': 'افزودن کتاب',
    '/admin/library/publishers': 'مدیریت ناشران',
    '/admin/library/authors': 'مدیریت نویسندگان',
    '/admin/library/comments': 'مدیریت کامنت‌ها',
  };

  const title = obj[pathname];

  return (
    <>
      <div
        className="fixed flex items-center justify-between right-0 bg-sand top-0 w-full h-16 ps-64 pe-8 shadow-sm z-30"
        id="myHeader"
      >
        <h1 className="text-2xl font-semibold text-dark">{title}</h1>
      </div>
    </>
  );
}

export default Header;
