import { format } from 'date-fns';

export const formatDateToUTC = (isoDateString: any) => {
  // Convert ISO string to a Date object
  const date = new Date(isoDateString);

  return format(date, 'MMMM dd, yyyy');
};
export const formatDateToUTCShort = (isoDateString: any) => {
  // Convert ISO string to a Date object
  const date = new Date(isoDateString);

  return format(date, 'MMM/d/yyyy');
};

export const formatTimeToUTC = (isoDateString: any) => {
  const date = new Date(isoDateString);
  return format(date, 'HH:mm'); // 24-hour time format
};
