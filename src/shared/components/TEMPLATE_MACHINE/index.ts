import { Machine } from 'xstate'
import Context from './context'
import Schema from './schema'
import Event from './event'

const machine = Machine<Context, Schema, Event>({})

export default machine
