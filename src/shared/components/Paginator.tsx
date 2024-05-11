import Pagination from 'react-bootstrap/Pagination';

interface Props {
  current: number;
  total: number;
  changePage: (page: number) => void;
}

export function Paginator(props: Props) {
  const { current, total, changePage } = props;
  return (
    <Pagination>
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
  );
}
