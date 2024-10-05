interface Props {
  total: number;
  values: Schema<'RatingResponseDTO'>['result'];
}

export function RatingChart({ values, total }: Props) {
  if (!values) {
    values = Array(6).fill({count: 0});
  }
  return (
    <>
      <progress className="progress progress-warning w-full h-4" value={values[1]!.count} max={total} />
      <progress className="progress progress-warning w-full h-4" value={values[2]!.count} max={total} />
      <progress className="progress progress-warning w-full h-4" value={values[3]!.count} max={total} />
      <progress className="progress progress-warning w-full h-4" value={values[4]!.count} max={total} />
      <progress className="progress progress-warning w-full h-4" value={values[5]!.count} max={total} />
    </>
  );
}
