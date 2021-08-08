import { format } from 'date-fns'

export const dateConvert = (timeString: string | null, formatOpt = 'yyyy/MM/dd HH:mm') => {
  if (!timeString) return Promise.resolve(null)
  let utcString = `${timeString}:00Z`
  let utcDate = new Date(utcString)
  return import(`date-fns/locale/${window.navigator.language}`).then((localize) => {
    return format(utcDate, formatOpt, {
      locale: localize.default,
    })
  })
}
