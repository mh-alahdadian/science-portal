import { CaretLeft, CaretRight, DotsThreeOutline } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { toPersianNumber } from "utils/helper";

const Paginate = ({ page, setPage, dataCount, per_page }) => {
  const maxPageCount = 832;
  const totalPages = Math.min(
    Math.ceil(dataCount / per_page || 1),
    maxPageCount,
  );

  if (totalPages < 2) return <></>;

  return (
    <ReactPaginate
      className="flex flex-row-reverse gap-4 justify-center items-center mt-8"
      pageClassName="text-light-neutral-text-medium font-body-medium rounded-xl"
      breakLabel={
        <div className="size-10 flex items-center justify-center">
          <DotsThreeOutline className="font-body-large text-light-neutral-text-medium" />
        </div>
      }
      nextLabel={
        totalPages <= 1 ? (
          ""
        ) : (
          <div className="size-10 flex items-center justify-center">
            <CaretRight className="font-body-large text-light-neutral-text-medium" />
          </div>
        )
      }
      activeClassName="!text-[#ffffff] bg-[#432FA7]"
      onPageChange={(x) => setPage(Math.min(x.selected + 1, maxPageCount))}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={page - 1}
      previousLabel={
        page == 1 ? (
          ""
        ) : (
          <div className="size-10 flex items-center justify-center">
            <CaretLeft className="font-body-large text-light-neutral-text-medium" />
          </div>
        )
      }
      renderOnZeroPageCount={null}
      pageLabelBuilder={(page) => (
        <div className="size-10 font-body-medium flex items-center justify-center">
          {toPersianNumber(page)}
        </div>
      )}
    />
  );
};

Paginate.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  dataCount: PropTypes.number,
  per_page: PropTypes.number.isRequired,
};

export default Paginate;
