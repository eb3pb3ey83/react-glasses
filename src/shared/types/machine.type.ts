import { EventObject, Interpreter, State } from 'xstate'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateType<ContextType, EventType extends EventObject> = State<ContextType, EventType, any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SendType<ContextType, EventType extends EventObject> = Interpreter<ContextType, any, EventType>['send']
export type MachineReactContextType<ContextType, EventType extends EventObject> = React.Context<{
  state: StateType<ContextType, EventType>
  send: SendType<ContextType, EventType>
} | null>
