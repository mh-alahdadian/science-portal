import clsx from 'clsx';

interface Props {
  current: number;
  total: number;
  pageSize: number;
  changePage: (page: number) => void;
  changePageSize: (page: number) => void;
}

export function Paginator(props: Props) {
  const { current, total, changePage, changePageSize, pageSize } = props;
  return (
    <div className="flex gap-4 items-center justify-center mt-3">
      <div className="join *:join-item *:btn">
        <button className="">{First}</button>
        <button className="">{Prev}</button>
        {Array(total)
          .fill(0)
          .map((_, index) => (
            <button
              className={clsx(current == index && 'btn-active')}
              key={index}
              onClick={() => changePage(index)}
            >
              {index + 1}
            </button>
          ))}
        {/* <Pagination.Ellipsis /> */}
        <button className="">{Next}</button>
        <button className="">{Last}</button>
      </div>
      <select
        className="select select-bordered"
        value={pageSize}
        onChange={(e) => changePageSize(Number(e.target.value))}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
      <span>{`صفحه ${current + 1} از ${total}`}</span>
    </div>
  );
}

const First = '«';
const Prev = '‹';
const Ellipsis = '…';
const Next = '›';
const Last = '»';
