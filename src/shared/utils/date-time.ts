export function formatDateTime(time: number | string) {
  return new Date(time).toLocaleString('fa-IR');
}
