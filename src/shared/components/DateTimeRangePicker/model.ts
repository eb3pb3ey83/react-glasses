export interface RangeModifier {
  from: Date | undefined | null
  to: Date | undefined | null
}

export interface BeforeModifier {
  before: Date
}

export interface AfterModifier {
  after: Date
}

export interface BeforeAfterModifier {
  after: Date
  before: Date
}

export interface DaysOfWeekModifier {
  daysOfWeek: number[]
}

export type FunctionModifier = (date: Date) => boolean

export type Modifier = Date | RangeModifier | BeforeModifier | AfterModifier | BeforeAfterModifier | DaysOfWeekModifier | FunctionModifier | undefined

export interface Modifiers {
  today: Modifier | Modifier[]
  outside: Modifier | Modifier[]
  [other: string]: Modifier | Modifier[] | undefined
}

export interface NavbarElementProps {
  className: string
  onPreviousClick(callback?: () => void): void
  onNextClick(callback?: () => void): void
}

export interface Props {
  fromDate?: Date
  toDate?: Date
  onDatesChange: (arg: Date, type: 'from' | 'to') => void
  fromTime: string | Date
  toTime: string | Date
  onTimesChange: (arg: string | Date, type: 'from' | 'to') => void
  dateError: {
    from: boolean
    to: boolean
  }
  timeError: {
    from: boolean
    to: boolean
  }
  dateDisabled: {
    from: boolean
    to: boolean
  }
  timeDisabled: {
    from: boolean
    to: boolean
  }
}
