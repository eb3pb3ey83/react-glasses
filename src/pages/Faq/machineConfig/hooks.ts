import { useMachine } from '@xstate/react'
import { useCountryType } from 'src/shared/hooks/useCountryType'
import machine from '.'
import { EventType } from './eventType'

export const useFaqMachine = () => {
  const [state, send] = useMachine(machine)
  const searchCountryType = (country_type: '1' | '2') => send({ type: EventType.COUNTRY_CHANGE, country_type })

  useCountryType(searchCountryType)

  return {
    searchCountryType,
    context: state.context,
  }
}
