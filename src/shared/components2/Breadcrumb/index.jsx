import {Fragment} from "react";
import PropTypes from "prop-types";
import {CaretLeft} from "@phosphor-icons/react";


export const Breadcrumbs = ({ breadcrumb }) => {

  return (
    <div className={'flex flex-row justify-center items-center text-light-neutral-text-medium font-body-small'}>
      {breadcrumb && (breadcrumb.map((item, index) => (
        <Fragment key={index}>
          {item.link ? (
            <a href={item.link}>
              <span
                className={`${index === breadcrumb.length - 1 ? 'font-subtitle-large text-light-neutral-text-high' : ''}`}>
                {item.title}
              </span>
            </a>
          ) : (
            <span
              className={`${index === breadcrumb.length - 1 ? 'font-subtitle-large text-light-neutral-text-high' : ''}`}>
              {item.title}
            </span>
          )}
          {index < breadcrumb.length - 1 && (
            <CaretLeft className="mx-2"/>
          )}
        </Fragment>
      )))}
    </div>
  );
};

Breadcrumbs.propTypes = {
  breadcrumb: PropTypes.array,
};
