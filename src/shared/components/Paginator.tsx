import clsx from "clsx";
import { useScreen } from "@/hooks";

interface Props {
  current: number;
  total: number;
  pageSize: number;
  changePage: (page: number) => void;
  changePageSize: (page: number) => void;
}

function pagination(currentPage: number, totalPages: number, delta = 2) {
  if (totalPages <= 1) {
    return [1];
  }

  const range: (number | typeof Ellipsis)[] = [];
  const start = currentPage - delta;
  const stop = currentPage + delta;
  let range_s = Math.max(start, 1);
  let range_e = Math.min(stop, totalPages);

  if (start === 2) range.push(1);
  else if (start > 2) range.push(Ellipsis);

  for (let i = range_s; i <= range_e; i++) {
    range.push(i);
  }

  if (stop === totalPages - 1) range.push(totalPages);
  else if (stop < totalPages) range.push(Ellipsis);

  return range;
}

export function Paginator(props: Props) {
  const { isSmall } = useScreen();
  const { current, total, changePage, changePageSize, pageSize } = props;

  return (
    <div className="flex gap-4 items-center justify-center my-3">
      <div className="join">
        <button className={clsx("join-item btn", isSmall && "btn-sm")}>
          {Prev}
        </button>

        {pagination(current + 1, total, 2).map((index) =>
          index === Ellipsis ? (
            <span
              key={index}
              className={clsx("join-item btn", isSmall && "btn-sm")}
            >
              {index}
            </span>
          ) : (
            <button
              className={clsx(
                "join-item btn",
                isSmall && "btn-sm",
                current === index - 1 && "btn-active"
              )}
              key={index}
              onClick={() => changePage(index - 1)}
            >
              {index}
            </button>
          )
        )}

        <button className={clsx("join-item btn", isSmall && "btn-sm")}>
          {Next}
        </button>
      </div>

      {/* <select
        className={clsx(isSmall && "select-sm")}
        value={pageSize}
        onChange={(e) => changePageSize(Number(e.target.value))}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
      */}
      <span>{`صفحه ${current + 1} از ${total + 1}`}</span>
    </div>
  );
}

const First = "«";
const Prev = "‹";
const Ellipsis = "…";
const Next = "›";
const Last = "»";
