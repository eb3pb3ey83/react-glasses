import { useMachine } from '@xstate/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import machine from '.'
import Context from './context'
import { EventType } from './eventType'

export const useDrawerMachine = (contextData: Partial<Context>) => {
  const { rootUrl, creatorUrl, editorUrl } = contextData
  const history = useHistory()
  const pathname = location.pathname

  const [state, send] = useMachine(machine, {
    context: { rootUrl, creatorUrl, editorUrl, history },
  })

  const actions = {
    openCreator() {
      send({ type: EventType.OPEN_CREATOR })
    },
    closeDrawer() {
      send({ type: EventType.CLOSE_DRAWER })
    },
    openEditor(id?: number) {
      send({ type: EventType.OPEN_EDITOR, id })
    },
  }

  React.useEffect(() => {
    const isMainPage = pathname === rootUrl
    const rootUrlLength = rootUrl ? rootUrl.length : 0
    const isCreatePage = location.pathname.length > rootUrlLength && location.pathname.includes('create')
    const isEditPage = location.pathname.length > rootUrlLength

    isCreatePage && actions.openCreator()
    isEditPage && actions.openEditor()
    isMainPage && actions.closeDrawer()
  }, [location.pathname])

  return {
    ...actions,
    state,
  }
}
