import { OpenAlert } from './event'
import { assign } from 'xstate'
import Context from './context'

export const actions = {
  openAlert: assign<Context, OpenAlert>({
    alertMessage: (_context, event) => event.message,
  }),
}
