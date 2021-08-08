import moment from 'moment'
export function formatDate(date: string) {
  return moment(date).add(8, 'hours').format('YYYY/MM/DD HH:mm')
}
