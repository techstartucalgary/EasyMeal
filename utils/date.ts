import dayjs from 'dayjs';

export const format = (date: Date | string, dateFormat: string) =>
  dayjs(date).format(dateFormat);
