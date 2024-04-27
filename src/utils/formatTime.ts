import { format } from 'date-fns';

export function fDate(date: Date) {
  return format(date, 'dd/MM/yyyy HH:mm:ss');
}

export function fStringDate(dateString?: string) {
  return dateString ? fDate(new Date(dateString)) : '-';
}
