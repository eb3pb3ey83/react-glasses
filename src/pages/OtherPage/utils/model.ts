export interface setDateError {
  value: dateValue
  isRange: boolean
}
export interface setDateErrorT {
  value: timeValue
  isRange: boolean
}
export type dateValue = { from?: Date | undefined; to?: Date | undefined; error: { from: boolean; to: boolean } }
export type timeValue = { from: Date | string; to: Date | string; error: { from: boolean; to: boolean } }
export interface dateValidate {
  date: { from?: Date | undefined; to?: Date | undefined; error: { from: boolean; to: boolean } }
  time: { from: Date | string; to: Date | string; error: { from: boolean; to: boolean } }
  setDate: (arg: { from?: Date | undefined; to?: Date | undefined; error: { from: boolean; to: boolean } }) => void
  setTime: (arg: { from: Date | string; to: Date | string; error: { from: boolean; to: boolean } }) => void
  isRange: boolean
}

export interface emptyP {
  [key: string]: boolean
}
