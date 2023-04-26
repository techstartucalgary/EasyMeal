import { format } from 'utils/date';

export const useWeekRange = () => {
  const curr = new Date(); // get current date
  const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  const last = first + 6; // last day is the first day + 6

  const firstDay = format(new Date(curr.setDate(first)), 'YYYY-MM-DD');
  const lastDay = format(new Date(curr.setDate(last)), 'YYYY-MM-DD');

  const weekDaysArray = [
    {
      title: 'MON',
      value: format(new Date(curr.setDate(first)), 'YYYY-MM-DD'),
    },
    {
      title: 'TUE',
      value: format(new Date(curr.setDate(first + 1)), 'YYYY-MM-DD'),
    },
    {
      title: 'WED',
      value: format(new Date(curr.setDate(first + 2)), 'YYYY-MM-DD'),
    },
    {
      title: 'THU',
      value: format(new Date(curr.setDate(first + 3)), 'YYYY-MM-DD'),
    },
    {
      title: 'FRI',
      value: format(new Date(curr.setDate(first + 4)), 'YYYY-MM-DD'),
    },
    {
      title: 'SAT',
      value: format(new Date(curr.setDate(first + 5)), 'YYYY-MM-DD'),
    },
    {
      title: 'SUN',
      value: format(new Date(curr.setDate(first + 6)), 'YYYY-MM-DD'),
    },
  ];

  return { firstDay, lastDay, weekDaysArray };
};
