import { OpenEditor } from './event'
import Context from './context'

export const actions = {
  openCreator: (context: Context) => {
    context.history.push(context.creatorUrl)
  },
  openEditor: (context: Context, event: OpenEditor) => {
    event.id && context.history.push(`${context.editorUrl}/${event.id}`)
  },
  closeDrawer: (context: Context) => {
    context.history.push(context.rootUrl)
  },
}
