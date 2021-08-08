import { Resource } from 'i18next'
import { get, set } from 'lodash'
import getService from '../base'
import apiKey from '../base/apiKey'
import { SheetModel } from './model'

const spreadSheetInfo = {
  spreadsheetID: '1s8EAnLYtOqWAc4JmdxvIIXV83JqITGNUXWWQ23yjlZ0',
  spreadsheetIndex: 1,
  languages: ['zh-TW', 'en'],
}

export function googleSpreadsheetToJson(): Promise<Resource> {
  const { spreadsheetID, spreadsheetIndex, languages } = spreadSheetInfo
  const url = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/${spreadsheetIndex}/public/values?alt=json`

  return getService<SheetModel>({
    config: { url, method: 'get' },
    name: apiKey.googleSpreadSheet,
  })
    .then((response) => {
      return languages.reduce(
        (accumulator, currentLang) => {
          const pathOfPath = 'gsx$path.$t' // spreadsheet 上的 path
          const pathOfValue = `gsx$${currentLang.toLowerCase()}.$t` // spreadsheet 上的 語言資料
          const pairs = response.data.feed.entry.map((row) => [get(row, pathOfPath), get(row, pathOfValue)])

          const langObject = pairs.reduce((newAccumulator, [path, value]) => {
            if (path === 'TBD' || path === '') {
              // 如果 key 為 'TBD' 時不處理，返回原物件
              return newAccumulator
            } else {
              // 將值寫入物件巢狀結構
              return set(newAccumulator, path, value)
            }
          }, {})

          return {
            ...accumulator, // 保留先前物件內容
            [currentLang]: {
              translation: langObject,
            }, // 將該語言資料指派
          }
        },
        { en: { translation: {} }, 'zh-TW': { translation: {} } },
      )
    })
    .catch((error) => {
      throw new Error(`Spreadsheet to JSON 錯誤訊息為: ${error.message}`)
    })
}
