import Pagination from 'react-bootstrap/Pagination';

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
      <Pagination className="flex gap-4 items-center">
        <Pagination.First />
        <Pagination.Prev />
        {Array(total)
          .fill(0)
          .map((_, index) => (
            <Pagination.Item key={index} active={current == index + 1}>
              {index + 1}
            </Pagination.Item>
          ))}
        {/* <Pagination.Ellipsis /> */}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
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
