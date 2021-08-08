import { Machine } from 'xstate'
import Context from './context'
import Schema from './schema'
import { Events } from './event'
import { EventType } from './eventType'
import { actions } from './actions'

const machine = Machine<Context, Schema, Events>({
  initial: 'viewMode',
  states: {
    viewMode: {
      on: {
        [EventType.OPEN_CREATOR]: {
          target: 'creatorOpened',
          actions: actions.openCreator,
        },
        [EventType.OPEN_EDITOR]: {
          target: 'editorOpened',
          actions: actions.openEditor,
        },
      },
    },
    creatorOpened: {
      on: {
        [EventType.CLOSE_DRAWER]: {
          target: 'viewMode',
          actions: actions.closeDrawer,
        },
      },
    },
    editorOpened: {
      on: {
        [EventType.CLOSE_DRAWER]: {
          target: 'viewMode',
          actions: actions.closeDrawer,
        },
      },
    },
  },
})

export default machine
