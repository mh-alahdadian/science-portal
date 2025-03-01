import Link from 'next/link';
import PropTypes from 'prop-types';

export const SidebarSubMenuItem = ({ isActive = false, title = 'عنوان', path = '#' }) => {
  return (
    <Link
      to={path}
      className={`flex items-center justify-end px-[8px] py-[4px] relative self-stretch w-full flex-[0_0_auto] ${
        isActive ? 'bg-light-neutral-background-medium' : ''
      } rounded-[8px]`}
    >
      <div className="pl-0 pr-[34px] py-0 inline-flex items-center justify-end gap-[16px] relative flex-[0_0_auto]">
        <div
          className={
            'relative w-fit mt-[-1.00px] font-body-small whitespace-nowrap [direction:rtl] ' +
            `${isActive ? 'text-light-neutral-text-high' : 'text-light-neutral-text-medium'}`
          }
        >
          {title}
        </div>
      </div>
    </Link>
  );
};

SidebarSubMenuItem.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string,
  path: PropTypes.string,
};
