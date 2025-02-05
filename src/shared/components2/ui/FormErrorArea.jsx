import PropTypes from "prop-types";
import { Warning} from "@phosphor-icons/react";

export const FormErrorWrapper = ({show = false, title, text}) => {

  return (
    <>
      {show &&
        <div className="mb-4 p-4 flex flex-col gap-8 w-full rounded-lg bg-light-error-background-highlight">
          <div className="inline-flex items-center">
            <span className="text-light-error-text-rest mx-2"><Warning size={26}/></span>
            <span className="text-light-neutral-text-high font-body-large">{title}</span>
          </div>
          {text && (
            <div className="inline-flex">
              <p className="font-body-medium text-light-neutral-text-high">{text}</p>
            </div>
          )}
        </div>
      }
    </>
  );
};

FormErrorWrapper.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
};
