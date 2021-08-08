import React from 'react'
import { dateConvert } from 'src/utils/dateTimeConvert'

type Toconvert = { [key: string]: unknown }
type ToconvertArr = Array<{ [key: string]: unknown }>
interface DateOpts {
  dateStart?: {
    key: string
    format: string
  }
  dateEnd?: {
    key: string
    format: string
  }
  dateCreate?: {
    key: string
    format: string
  }
  dateUpdate?: {
    key: string
    format: string
  }
}

export const useConvertDate = (dataToConvert: ToconvertArr | Toconvert | undefined, dateOpts: DateOpts) => {
  const [dateData, setDateData] = React.useState<
    { dateCreate: string | null; dateStart: string | null; dateEnd: string | null; dateUpdate: string | null }[]
  >()
  React.useEffect(() => {
    if (dataToConvert) {
      let convertArr = Array.isArray(dataToConvert) ? dataToConvert : [dataToConvert]
      const dateLocal = convertArr.map(async (item) => {
        return {
          dateStart:
            dateOpts.dateStart && item[dateOpts.dateStart.key]
              ? await dateConvert(`${item[dateOpts.dateStart.key]}:00Z`, dateOpts.dateStart.format)
              : null,
          dateEnd:
            dateOpts.dateEnd && item[dateOpts.dateEnd.key] ? await dateConvert(`${item[dateOpts.dateEnd.key]}:00Z`, dateOpts.dateEnd.format) : null,
          dateCreate:
            dateOpts.dateCreate && item[dateOpts.dateCreate.key]
              ? await dateConvert(`${item[dateOpts.dateCreate.key]}:00Z`, dateOpts.dateCreate.format)
              : null,
          dateUpdate:
            dateOpts.dateUpdate && item[dateOpts.dateUpdate.key]
              ? await dateConvert(`${item[dateOpts.dateUpdate.key]}:00Z`, dateOpts.dateUpdate.format)
              : null,
        }
      })
      Promise.all(dateLocal).then((value) => {
        setDateData(value)
      })
    }
  }, [dataToConvert, dateOpts])

  return { dateData }
}
