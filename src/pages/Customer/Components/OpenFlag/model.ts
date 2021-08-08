import { AlertModel } from 'src/shared/machine/alertMachine/model'
import { createContext } from 'react'

export type flagValues = {
  [key: string]: unknown
  open_flag?: string
  role_type?: '0' | '1' | '2' | '3' | null
}
export type setFlagValues = (values: flagValues, shouldValidate?: boolean | undefined) => void

interface OpenFlagProps {
  openAlert?: (message: AlertModel) => void
  closeAlert?: () => void
  alertTitle?: string

  alertContent?: string
  isAlwaysConfirm?: boolean
  onConfirm?: (values: flagValues, setValues?: setFlagValues) => void
  buttonLabel?: string
}

export interface Props {
  value: OpenFlagProps
}

export const OpenFlagContext = createContext<OpenFlagProps>({})
