import { format } from 'date-fns';

export function fDate(date: Date) {
  return format(date, 'dd/MM/yyyy HH:mm:ss.SSS');
}

export function fStringDate(dateString?: string) {
  return dateString ? fDate(new Date(dateString)) : '-';
}

export function fMinutesAndSeconds(startDate: Date, endDate: Date) {
  const diff = Math.abs(startDate.getTime() - endDate.getTime());
  const minutes = Math.floor(diff / 60000);
  const seconds = ((diff % 60000) / 1000).toFixed(2);
  return `${minutes}:${seconds.padStart(5, '0')}`;
}
