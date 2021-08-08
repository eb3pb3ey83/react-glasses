import { createContext } from 'react'

export interface contextProps {
  language?: string
  setLanguage?: React.Dispatch<React.SetStateAction<string>>
}

export const I18n = createContext<contextProps>({})
