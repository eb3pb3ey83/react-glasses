import { assign, Machine } from 'xstate'
import Context from './context'
import Schema from './schema'
import Event from './event'

const machine = Machine<Context, Schema, Event>(
  {
    initial: 'emailForm',
    context: {
      duration: 60,
      elapsed: 0,
      interval: 1,
    },
    states: {
      emailForm: {
        initial: 'tickStop',
        states: {
          tickStop: {
            on: {
              RESET_PAGE_SEND: 'tickStart',
              SEND: '#emailSend',
              RESET: '#resetForm',
            },
          },
          tickStart: {
            always: { target: 'tickStop', cond: 'timerExpired' },
            invoke: { src: 'ticker' },
            on: { TICK: { actions: 'tick' } },
          },
        },
      },
      emailSend: {
        id: 'emailSend',
        on: { CLOSE: 'emailForm.tickStart' },
      },
      resetFailed: {
        on: { SEND_EMAIL: 'emailForm.tickStop' },
      },
      resetForm: {
        id: 'resetForm',
        on: { GET_TOKEN_FAILED: 'resetFailed', RESET_SUCCESS: 'resetSuccess' },
      },
      resetSuccess: {},
    },
  },
  {
    actions: {
      tick: assign<Context>({
        elapsed: (ctx) => ctx.elapsed + ctx.interval,
      }),
    },
    guards: {
      timerExpired: (ctx) => ctx.elapsed >= ctx.duration,
    },
    services: {
      ticker: (ctx) => (callback) => {
        const interval = setInterval(() => {
          callback('TICK')
        }, ctx.interval * 1000)

        return () => clearInterval(interval)
      },
    },
  },
)

export default machine
