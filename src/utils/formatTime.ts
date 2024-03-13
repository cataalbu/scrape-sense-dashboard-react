import { format } from 'date-fns';

export function fDate(date: Date) {
  return format(date, 'dd/MM/yyyy HH:mm');
}
