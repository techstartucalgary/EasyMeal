import { format } from 'utils/date';

export const useWeekRange = () => {
  const curr = new Date(); // get current date
  const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  const last = first + 6; // last day is the first day + 6

  const firstDay = format(new Date(curr.setDate(first)), 'YYYY-MM-DD');
  const lastDay = format(new Date(curr.setDate(last)), 'YYYY-MM-DD');

  return { firstDay, lastDay };
};
