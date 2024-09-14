interface statisticProps {
  title: string;
  count: number;
  color: string;
}

export default function StatisticCard({ title, count, color }: statisticProps) {
  return (
    <div
      style={{ backgroundColor: `#${color}` }}
      className={`shadow-lg py-2 px-4 w-48 flex gap-4 justify-between items-center rounded-md`}
    >
      <span>{title}</span>
      <div className="bg-white rounded-full shadow-xl p-4 flex justify-center items-center">{count}</div>
    </div>
  );
}
