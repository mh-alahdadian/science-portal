interface Props {
  total: number;
  values: Record<1 | 2 | 3 | 4 | 5, number>;
}

export function RatingChart({ values, total }: Props) {
  return (
    <>
      <progress className="progress progress-warning w-full h-4" value={values[1]} max={total} />
      <progress className="progress progress-warning w-full h-4" value={values[2]} max={total} />
      <progress className="progress progress-warning w-full h-4" value={values[3]} max={total} />
      <progress className="progress progress-warning w-full h-4" value={values[4]} max={total} />
      <progress className="progress progress-warning w-full h-4" value={values[5]} max={total} />
    </>
  );
}
