import dayjs, { ConfigType } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);
dayjs.extend(duration);
dayjs.extend(relativeTime);

// @ts-ignore
dayjs.calendar('jalali');

export function formatDateTime(time: number | string) {
  return new Date(time).toLocaleString('fa-IR');
}

export function fromNow(date: ConfigType) {
  return dayjs(date).locale('fa').fromNow();
}
