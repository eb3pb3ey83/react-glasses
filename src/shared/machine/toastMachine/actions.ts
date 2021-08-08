import { OpenToast } from './event'
import Context from './context'
import { assign } from 'xstate'

export const actions = {
  openToast: assign<Context, OpenToast>({
    toastMessage: (_context, event) => event.message,
    isError: (_context, event) => event.isError,
  }),
}
