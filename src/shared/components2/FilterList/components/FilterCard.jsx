import { useRef } from "react";
import PropTypes from "prop-types";
import { Info } from "@phosphor-icons/react";
import { Card } from "../../ui/Card.jsx";

export const FilterCard = ({
  title,
  icon: Icon,
  hasInfo = false,
  hasBullet = false,
  onClick = undefined,
  className = "",
  isOpen = true,
  children,
}) => {
  const cardRef = useRef(null);

  const handleCardClick = (event) => {
    if (onClick) {
      onClick(event);
    }
    if (cardRef.current && !isOpen) {
      setTimeout(() => {
        const parentElement = cardRef.current.parentElement;
        if (parentElement) {
          const cardPosition = cardRef.current.offsetTop;
          parentElement.scrollTo({
            top: cardPosition,
            behavior: "smooth",
          });
        }
      }, 500);
    }
  };

  return (
    <Card
      ref={cardRef}
      onClick={handleCardClick}
      className={
        `flex flex-col !p-[16px] !relative ${!isOpen && "cursor-pointer"} ` +
        className
      }
    >
      {hasBullet && (
        <div
          className={
            "absolute top-1 right-1 bg-light-warning-background-rest w-2 h-2 rounded-full"
          }
        ></div>
      )}
      <div
        className={`flex w-full font-body-medium ${isOpen ? "justify-end mb-4" : "justify-center"}`}
      >
        {isOpen && (
          <>
            {hasInfo && (
              <Info
                size={14}
                className={"h-full text-light-neutral-text-low cursor-pointer"}
              />
            )}
            <h3
              className={`text-light-neutral-text-high font-overline-large ml-2`}
            >
              {title}
            </h3>
          </>
        )}
        <Icon
          size={20}
          className={`text-light-neutral-text-low ${isOpen && "ml-2"}`}
        />
      </div>
      {children}
    </Card>
  );
};

FilterCard.propTypes = {
  hasInfo: PropTypes.bool,
  hasBullet: PropTypes.bool,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};
