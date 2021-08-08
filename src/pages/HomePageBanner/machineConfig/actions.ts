import { assign } from 'xstate'
import Context from './context'
import { CountryChange } from './event'

export const actions = {
  changeCountry: assign<Context, CountryChange>({
    country_type: (_context, event) => event.country_type as '1' | '2',
  }),
}
