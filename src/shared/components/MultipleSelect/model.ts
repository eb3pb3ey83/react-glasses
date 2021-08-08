import { SendType, StateType } from 'src/shared/types/machine.type'
import Context from './machineConfig/context'
import { Events } from './machineConfig/event'

export interface Props {
  placeholder: string
  width?: number
  items: Items[]

  onSubmit: (list: number[]) => void
}

export type sendEventType = SendType<Context, Events>
export type currentStateType = StateType<Context, Events>

export interface Items {
  id: number
  name: string
}
