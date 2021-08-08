export interface SpreadsheetModel {
  spreadsheetID: string
  spreadsheetIndex: number
  languages: string[]
}

export interface SheetModel {
  feed: {
    entry: unknown[]
  }
}
