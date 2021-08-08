import { RouteComponentProps } from 'react-router-dom'

interface Context {
  rootUrl: string
  creatorUrl: string
  editorUrl: string
  history: RouteComponentProps['history']
}

export default Context
