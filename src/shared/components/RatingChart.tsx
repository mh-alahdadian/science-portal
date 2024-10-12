interface Props {
  total: number;
  values: Schema<'RatingResponseDTO'>['result'];
}

export function RatingChart({ values, total }: Props) {
  if (!values) {
    return <div className="flex justify-center align-center text-xl">هنوز امتیازی ثبت نشده است.</div>;
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
