import { assign } from 'xstate'
import Context from './context'
import { PageChange, KeywordChange, OrderChangeContact, CountryChange, FlagChange, RoleChange } from './event'

export const actions = {
  changePage: assign<Context, PageChange>({
    page: (_context, event) => event.page,
  }),
  changeFlag: assign<Context, FlagChange>({
    open_flag: (_context, event) => event.flag,
  }),
  changeRole: assign<Context, RoleChange>({
    role_type: (_context, event) => event.role,
  }),
  changeKeyword: assign<Context, KeywordChange>({
    keyword: (_context, event) => event.keyword,
  }),
  changeOrder: assign<Context, OrderChangeContact>({
    order: (_context, event) => event.order,
  }),
  changeCountry: assign<Context, CountryChange>({
    country_type: (_context, event) => event.country_type,
  }),
}
