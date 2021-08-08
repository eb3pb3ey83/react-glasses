export type stringObject = { [key: string]: string }
export type numberObject = { [key: string]: number }
export type booleanObject = { [key: string]: number }
export type dataObject = { [key: string]: unknown }
export type stringArray = string[]
export type numberArray = number[]
export type booleanArray = boolean[]
export type dataArray = unknown[]

export type valueType = string | number | boolean
export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]
